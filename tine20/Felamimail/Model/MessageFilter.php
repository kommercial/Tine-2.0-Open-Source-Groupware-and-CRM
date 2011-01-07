<?php
/**
 * Tine 2.0
 * 
 * @package     Felamimail
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2009-2010 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 *
 * @todo        replace some 'custom' filters with normal filter classes
 */

/**
 * cache entry filter Class
 * @package     Felamimail
 */
class Felamimail_Model_MessageFilter extends Tinebase_Model_Filter_FilterGroup 
{
    /**
     * @var string application of this filter group
     */
    protected $_applicationName = 'Felamimail';
    
    /**
     * @var string name of model this filter group is designed for
     */
    protected $_modelName = 'Felamimail_Model_Message';
    
    /**
     * path for all inboxes filter
     */
    const PATH_ALLINBOXES = '/allinboxes';
    
    /**
     * @var array filter model fieldName => definition
     */
    protected $_filterModel = array(
        'id'            => array('filter' => 'Tinebase_Model_Filter_Id'), 
        'query'         => array(
            'filter'        => 'Tinebase_Model_Filter_Query', 
            'options'       => array('fields' => array('subject', 'from_email', 'from_name'))
        ),
        'folder_id'     => array('filter' => 'Tinebase_Model_Filter_Id'),
        'subject'       => array('filter' => 'Tinebase_Model_Filter_Text'),
        'from_email'    => array('filter' => 'Tinebase_Model_Filter_Text'),
        'from_name'     => array('filter' => 'Tinebase_Model_Filter_Text'),
        'received'      => array('filter' => 'Tinebase_Model_Filter_DateTime'),
    // custom filters
        'path'          => array('custom' => true),
        'to'            => array('custom' => true),
        'cc'            => array('custom' => true),
        'bcc'           => array('custom' => true),
        'flags'         => array('custom' => true),
        'account_id'    => array('custom' => true),
        'messageuid'    => array('filter' => 'Tinebase_Model_Filter_Int'),
    );

    /**
     * appends custom filters to a given select object
     * 
     * @param  Zend_Db_Select                       $_select
     * @param  Felamimail_Backend_Cache_Sql_Message $_backend
     * @return void
     */
    public function appendFilterSql($_select, $_backend)
    {
        $accountFilterAdded = FALSE;
        foreach ($this->_customData as $customData) {
            if ($customData['field'] == 'account_id') {
                $this->_addAccountFilter($_select, $_backend, (array) $customData['value']);
                $accountFilterAdded = TRUE;
                
            } else if ($customData['field'] == 'path') {
                $this->_addPathSql($_select, $_backend, $customData);
                $accountFilterAdded = TRUE;
                
            } else {
                $this->_addRecipientAndFlagsSql($_select, $_backend, $customData);
            }
        }
        
        if (! $accountFilterAdded) {
            $this->_addAccountFilter($_select, $_backend);
        }
        
        if (Tinebase_Core::isLogLevel(Zend_Log::TRACE)) Tinebase_Core::getLogger()->trace(__METHOD__ . '::' . __LINE__ . ' ' . $_select->__toString());
    }
    
    /**
     * add account filter
     * 
     * @param Zend_Db_Select $_select
     * @param  Felamimail_Backend_Cache_Sql_Message $_backend
     * @param array $_accountIds
     */
    protected function _addAccountFilter($_select, $_backend, array $_accountIds = array())
    {
        $accountIds = (empty($_accountIds)) ? Felamimail_Controller_Account::getInstance()->search(NULL, NULL, FALSE, TRUE) : $_accountIds;
        $folderIds = $this->_getFolderIdsForAccounts($accountIds);

        $db = $_backend->getAdapter();
        $_select->where($db->quoteInto($db->quoteIdentifier($_backend->getTableName() . '.folder_id') . ' IN (?)', $folderIds));        
    }
    
    /**
     * get folders for account
     * 
     * @param array $_accountIds
     * @return array
     */
    protected function _getFolderIdsForAccounts(array $_accountIds)
    {
        // get all folders of account
        $folderFilter = new Felamimail_Model_FolderFilter(array(
            array('field' => 'account_id',  'operator' => 'in', 'value' => $_accountIds)
        ));
        $folderBackend = new Felamimail_Backend_Folder();
        $folderIds = $folderBackend->search($folderFilter, NULL, TRUE);
        
        return $folderIds;
    }

    /**
     * add path custom filter
     * 
     * @param  Zend_Db_Select                       $_select
     * @param  Felamimail_Backend_Cache_Sql_Message $_backend
     * @param  array                                $_filterData
     * @return void
     */
    protected function _addPathSql($_select, $_backend, $_filterData)
    {
        $db = $_backend->getAdapter();
        
        $folderIds = array();
        foreach((array)$_filterData['value'] as $filterValue) {
            if ($filterValue === self::PATH_ALLINBOXES) {
                $folderIds = array_merge($folderIds, $this->_getFolderIdsOfAllInboxes());
            } else {
                $pathParts = explode('/', $filterValue);
                array_shift($pathParts);
                if (count($pathParts) == 1) {
                    // we only have an account id
                    $folderIds = array_merge($folderIds, $this->_getFolderIdsForAccounts((array) $pathParts[0]));
                } else if (count($pathParts) > 1) {
                    $folderIds[] = array_pop($pathParts);
                }
            }
        }
        
        $folderFilter = new Tinebase_Model_Filter_Id('folder_id', $_filterData['operator'], array_unique($folderIds));
        $folderFilter->appendFilterSql($_select, $_backend);
    }
    
    /**
     * get folder ids of all inboxes for accounts of current user
     * 
     * @return array
     */
    protected function _getFolderIdsOfAllInboxes()
    {
        $accounts = Felamimail_Controller_Account::getInstance()->search();
        $folderFilter = new Felamimail_Model_FolderFilter(array(
            array('field' => 'account_id',  'operator' => 'in',     'value' => $accounts->getArrayOfIds()),
            array('field' => 'localname',   'operator' => 'equals', 'value' => 'INBOX')
        ));
        $folderBackend = new Felamimail_Backend_Folder();
        $folderIds = $folderBackend->search($folderFilter, NULL, TRUE);
        
        return $folderIds;
    }
    
    /**
     * add to/cc/bcc and flags custom filters
     * 
     * @param  Zend_Db_Select                       $_select
     * @param  Felamimail_Backend_Cache_Sql_Message $_backend
     * @param  array                                $_filterData
     * @return void
     */
    protected function _addRecipientAndFlagsSql($_select, $_backend, $_filterData)
    {
        $db = $_backend->getAdapter();
        $foreignTables = $_backend->getForeignTables();
        
        // add conditions
        $tablename  = $_backend->getTablePrefix() . $foreignTables[$_filterData['field']]['table'];
        if ($_filterData['field'] !== 'flags') {
            $fieldName  = $tablename . '.name';
            $fieldEmail = $tablename . '.email';
        }
        
        // add filter value
        if (! is_array($_filterData['value'])) {
            $value      = '%' . $_filterData['value'] . '%';
        } else {
            $value = array();
            foreach ((array)$_filterData['value'] as $customValue) {
                $value[]      = '%' . $customValue . '%';
            }
        }
                        
        if ($_filterData['field'] == 'flags') {
            if ($_filterData['operator'] == 'equals' || $_filterData['operator'] == 'contains') {
                $_select->having($db->quoteInto('flags LIKE ?', $value));
            } else if ($_filterData['operator'] == 'in' || $_filterData['operator'] == 'notin') {
                if (empty($value)) {
                    $whereString = 'flags IS NULL';
                } else {
                    $value = (array) $value;
                    $where = array();
                    $op = ($_filterData['operator'] == 'in') ? 'LIKE' : 'NOT LIKE';
                    $opImplode = ($_filterData['operator'] == 'in') ? ' OR ' : ' AND ';
                    foreach ($value as $flag) {
                        $where[] = $db->quoteInto('flags ' . $op . ' ?', $flag);
                    }
                    $whereString = implode($opImplode, $where);
                    if ($_filterData['operator'] == 'notin') {
                        $whereString = '(' . $whereString . ') OR flags IS NULL';
                    }
                }
                $_select->having($whereString);
            } else {
                $_select->having($db->quoteInto('flags NOT LIKE ? OR flags IS NULL', $value));
            }
        } else {
            $_select->where(
                $db->quoteInto($fieldName  . ' LIKE ?', $value) . ' OR ' .
                $db->quoteInto($fieldEmail . ' LIKE ?', $value)
            );
        }        
    }
}
