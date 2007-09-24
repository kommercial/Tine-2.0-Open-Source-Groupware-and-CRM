<?php

/**
 * this classes provides access to the sql table egw_addressbook_lists
 * 
 * @package     Addressbook
 * @license     http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * @author      Lars Kneschke <l.kneschke@metaways.de>
 * @copyright   Copyright (c) 2007-2007 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 *
 */
class Addressbook_Backend_Sql_Lists extends Zend_Db_Table_Abstract
{
    protected $_name = 'egw_addressbook_lists';
}
