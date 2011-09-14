<?php
/**
 * Tine 2.0
 *
 * @package     Tinebase
 * @subpackage  Setup
 * @license     http://www.gnu.org/licenses/agpl.html AGPL3
 * @copyright   Copyright (c) 2011 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Philipp Schüle <p.schuele@metaways.de>
 */
class Tinebase_Setup_Update_Release5 extends Setup_Update_Abstract
{
    /**
     * update to 5.1
     * - enum -> text
     */
    public function update_0()
    {
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>status</name>
                <type>text</type>
                <length>32</length>
                <default>enabled</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('applications', $declaration);
        $this->setTableVersion('applications', 3);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>visibility</name>
                <type>text</type>
                <length>32</length>
                <default>displayed</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('groups', $declaration);
        $this->setTableVersion('groups', 4);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>visibility</name>
                <type>text</type>
                <length>32</length>
                <default>displayed</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('accounts', $declaration);
        $this->setTableVersion('accounts', 9);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>status</name>
                <type>text</type>
                <length>32</length>
                <value>activated</value>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('registrations', $declaration);
        $this->setTableVersion('registrations', 2);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>type</name>
                <type>text</type>
                <length>32</length>
                <default>personal</default>
                <notnull>false</notnull>
            </field>');
        $this->_backend->alterCol('container', $declaration);
        $this->setTableVersion('container', 4);

        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>account_type</name>
                <type>text</type>
                <length>32</length>
                <default>user</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('container_acl', $declaration);
        $this->setTableVersion('container_acl', 3);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>own_degree</name>
                <type>text</type>
                <length>32</length>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('relations', $declaration);
        $this->setTableVersion('relations', 6);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>type</name>
                <type>text</type>
                <length>32</length>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('tags', $declaration);
        $this->setTableVersion('tags', 3);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>account_type</name>
                <type>text</type>
                <length>32</length>
                <default>user</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('tags_acl', $declaration);
        $this->setTableVersion('tags_acl', 2);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>account_type</name>
                <type>text</type>
                <length>32</length>
                <default>user</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('role_accounts', $declaration);
        $this->setTableVersion('role_accounts', 2);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>account_type</name>
                <type>text</type>
                <length>32</length>
                <default>user</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('preferences', $declaration);
        $this->setTableVersion('preferences', 7);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>account_type</name>
                <type>text</type>
                <length>32</length>
                <default>user</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('customfield_acl', $declaration);
        $this->setTableVersion('customfield_acl', 2);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>type</name>
                <type>text</type>
                <length>32</length>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('importexport_definition', $declaration);
        $this->setTableVersion('importexport_definition', 5);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>sent_status</name>
                <type>text</type>
                <length>32</length>
                <default>pending</default>
                <notnull>true</notnull>
            </field>');
        $this->_backend->alterCol('alarm', $declaration);
        $this->setTableVersion('alarm', 2);
        
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>status</name>
                <type>text</type>
                <length>32</length>
            </field>');
        $this->_backend->alterCol('async_job', $declaration);
        $this->setTableVersion('async_job', 2);
        
        $this->setApplicationVersion('Tinebase', '5.1');
    }
    
    /**
     * update to 5.2
     * - custom field config structure
     */
    public function update_1()
    {
        // create definition col
        $declaration = new Setup_Backend_Schema_Field_Xml('
            <field>
                <name>definition</name>
                <type>text</type>
            </field>');
        $this->_backend->addCol('customfield_config', $declaration, 4);
        
        // fetch all custom field config
        $stmt = $this->_db->query("SELECT * FROM `" . SQL_TABLE_PREFIX . "customfield_config`");
        $cfConfigs = $stmt->fetchAll(Zend_Db::FETCH_ASSOC);
        
        // xtype to datatype
        $typeMap = array(
            'textfield'                 => 'string',
            'datefield'                 => 'Date',
            'datetimefield'             => 'DateTime',
            'extuxclearabledatefield'   => 'Date',
            'customfieldsearchcombo'    => 'string',
            'numberfield'               => 'int',
            'checkbox'                  => 'bool'
        );
        
        // fill definition col
        foreach ($cfConfigs as $cfConfig) {
            $definition = array(
                'label'     => $cfConfig['label'],
                'type'      => array_key_exists($cfConfig['type'], $typeMap) ? $typeMap[$cfConfig['type']] : 'string',
                'length'    =>$cfConfig['length'], // validation like definiton
                'uiconfig' => array(
                    'xtype'          => $cfConfig['type'],
                    'value_search'   => $cfConfig['value_search'],
                    'group'          => $cfConfig['group'],
                    'order'          => $cfConfig['order'],
                )
            );
            
            $this->_db->update(SQL_TABLE_PREFIX . 'customfield_config', array(
                'definition' => json_encode($definition),
            ), "`id` LIKE '{$cfConfig['id']}'");
        }
        
        // drop unneded cols
        $this->_backend->dropCol('customfield_config', 'label');
        $this->_backend->dropCol('customfield_config', 'type');
        $this->_backend->dropCol('customfield_config', 'length');
        $this->_backend->dropCol('customfield_config', 'value_search');
        $this->_backend->dropCol('customfield_config', 'group');
        $this->_backend->dropCol('customfield_config', 'order');
        
        $this->setTableVersion('customfield_config', 5);
        $this->setApplicationVersion('Tinebase', '5.2');
    }
}