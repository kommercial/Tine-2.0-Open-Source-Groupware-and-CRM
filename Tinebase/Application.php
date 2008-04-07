<?php
/**
 * Tine 2.0
 * 
 * @package     Tinebase
 * @subpackage  Application
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @copyright   Copyright (c) 2007-2008 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Lars Kneschke <l.kneschke@metaways.de>
 * @version     $Id$
 */

/**
 * the class provides functions to handle applications
 * 
 * @package     Tinebase
 * @subpackage  Application
 */
class Tinebase_Application
{
    const ENABLED  = 'enabled';
    
    const DISABLED = 'disabled';
    
    /**
     * the table object for the SQL_TABLE_PREFIX . applications table
     *
     * @var Zend_Db_Table_Abstract
     */
    protected $applicationTable;

    private function __construct() {
        $this->applicationTable = new Tinebase_Db_Table(array('name' => SQL_TABLE_PREFIX . 'applications'));
    }
    private function __clone() {}

    /**
     * holdes the instance of the singleton
     *
     * @var Tinebase_Application
     */
    private static $instance = NULL;
    
    /**
     * Returns instance of Tinebase_Application
     *
     * @return Tinebase_Application
     */
    public static function getInstance() 
    {
        if (self::$instance === NULL) {
            self::$instance = new Tinebase_Application;
        }
        
        return self::$instance;
    }
    
    
    /**
     * returns one application identified by id
     *
     * @param int $_applicationId the id of the application
     * @todo code still needs some testing
     * @throws Exception if $_applicationId is not integer and not greater 0
     * @return Tinebase_Model_Application the information about the application
     */
    public function getApplicationById($_applicationId)
    {
        $applicationId = (int)$_applicationId;
        if($applicationId != $_applicationId) {
            throw new InvalidArgumentException('$_applicationId must be integer');
        }
        
        $row = $this->applicationTable->fetchRow('`id` = ' . $applicationId);
        
        $result = new Tinebase_Model_Application($row->toArray());
        
        return $result;
    }

    /**
     * returns one application identified by application name
     *
     * @param string $$_applicationName the name of the application
     * @todo code still needs some testing
     * @throws InvalidArgumentException, Exception
     * @return Tinebase_Model_Application the information about the application
     */
    public function getApplicationByName($_applicationName)
    {
        if(empty($_applicationName)) {
            throw new InvalidArgumentException('$_applicationName can not be empty');
        }
        
        $where = $this->applicationTable->getAdapter()->quoteInto('`name` = ?', $_applicationName);
        if(!$row = $this->applicationTable->fetchRow($where)) {
            throw new Exception("application $_applicationName not found");
        }
        
        $result = new Tinebase_Model_Application($row->toArray());
        
        return $result;
    }
    
    /**
     * get list of installed applications
     *
     * @param string $_sort optional the column name to sort by
     * @param string $_dir optional the sort direction can be ASC or DESC only
     * @param string $_filter optional search parameter
     * @param int $_limit optional how many applications to return
     * @param int $_start optional offset for applications
     * @return Tinebase_RecordSet_Application
     */
    public function getApplications($_filter = NULL, $_sort = 'id', $_dir = 'ASC', $_start = NULL, $_limit = NULL)
    {
        $where = array();
        if($_filter !== NULL) {
            $where[] = $this->applicationTable->getAdapter()->quoteInto('`name` LIKE ?', '%' . $_filter . '%');
        }
        
        $rowSet = $this->applicationTable->fetchAll($where, $_sort, $_dir, $_limit, $_start);

        $result = new Tinebase_Record_RecordSet('Tinebase_Model_Application', $rowSet->toArray());

        return $result;
    }    
    
    /**
     * get enabled or disabled applications
     *
     * @param int $_state can be Tinebase_Application::ENABLED or Tinebase_Application::DISABLED
     * @return Tinebase_Record_RecordSet list of applications
     */
    public function getApplicationsByState($_status)
    {
        if($_status !== Tinebase_Application::ENABLED && $_status !== Tinebase_Application::DISABLED) {
            throw new InvalidArgumentException('$_status can be only Tinebase_Application::ENABLED or Tinebase_Application::DISABLED');
        }
        $where[] = $this->applicationTable->getAdapter()->quoteInto('`status` = ?', $_status);
        
        $rowSet = $this->applicationTable->fetchAll($where);

        $result = new Tinebase_Record_RecordSet('Tinebase_Model_Application', $rowSet->toArray());

        return $result;
    }    
    
    /**
     * return the total number of applications installed
     *
     * @param $_filter
     * 
     * @return int
     */
    public function getTotalApplicationCount($_filter = NULL)
    {
        $where = array();
        if($_filter !== NULL) {
            $where[] = $this->applicationTable->getAdapter()->quoteInto('`name` LIKE ?', '%' . $_filter . '%');
        }
        $count = $this->applicationTable->getTotalCount($where);
        
        return $count;
    }
    
    /**
     * set application state
     *
     * @param array $_applicationIds application ids to set new state for
     * @param string $_state the new state
     */
    public function setApplicationState(array $_applicationIds, $_state)
    {
        if($_state != Tinebase_Application::DISABLED && $_state != Tinebase_Application::ENABLED) {
            throw new OutOfRangeException('$_state can be only Tinebase_Application::DISABLED  or Tinebase_Application::ENABLED');
        }
        
        $where = array(
            $this->applicationTable->getAdapter()->quoteInto('`id` IN (?)', $_applicationIds)
        );
        
        $data = array(
            'status' => $_state
        );
        
        $affectedRows = $this->applicationTable->update($data, $where);
        
        //error_log("AFFECTED:: $affectedRows");
    }
    
    /**
     * add new appliaction 
     *
     * @param Tinebase_Model_Application $_application the new application object
     * @return Tinebase_Model_Application the new application with the applicationId set
     */
    public function addApplication(Tinebase_Model_Application $_application)
    {
        $data = $_application->toArray();
        unset($data['id']);
        unset($data['tables']);
        
        $applicationId = $this->applicationTable->insert($data);
        
        $_application->id = $applicationId;
        
        return $_application;
    }
}