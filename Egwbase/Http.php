<?php
/**
 * HTTP interface to Egwbase
 *
 * @author Lars Kneschke <l.kneschke@metaways.de>
 * @package Egwbase
 *
 */
class Egwbase_Http
{
    /**
     * displays the login dialog
     *
     */
    public function login()
    {
        $view = new Zend_View();

        $view->setScriptPath('Egwbase/views');

        header('Content-Type: text/html; charset=utf-8');
        echo $view->render('login.php');
    }

    public function mainScreen()
    {
        $userApplications = array('Addressbook', 'Admin');
        $view = new Zend_View();

        $view->setScriptPath('Egwbase/views');

        //$view->jsIncludeFiles = array('extjs/build/locale/ext-lang-de-min.js');
        $view->jsIncludeFiles = array();
        $view->cssIncludeFiles = array();
        $view->initialTree = array();
        
        foreach($userApplications as $applicationName) {
            $view->jsIncludeFiles[] = $applicationName . '/Js/' . $applicationName . '.js';
            $view->cssIncludeFiles[] = $applicationName . '/css/' . $applicationName . '.css';
            $jsonAppName = $applicationName . '_Json';
            $application = new $jsonAppName;
            $view->initialTree[$applicationName] =  $application->getInitialTree('mainTree');
        }
        
        $translatedTimeZones = Zend_Registry::get('locale')->getTranslationList('timezone');
        
        $timeZoneData = array(
            'name'           => Zend_Registry::get('userTimeZone'),
            'translatedName' => $translatedTimeZones[Zend_Registry::get('userTimeZone')]
        );
        
        $view->configData = array(
            'timeZone' => $timeZoneData
        );
        
        
        $view->title="eGroupWare 2.0";

        header('Content-Type: text/html; charset=utf-8');
        echo $view->render('mainscreen.php');
    }
}