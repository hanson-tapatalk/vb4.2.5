<?php
/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 4.2.5 - Licence Number VBF83FEF44
|| # ---------------------------------------------------------------- # ||
|| # Copyright ©2000–2019 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| #        www.vbulletin.com | www.vbulletin.com/license.html        # ||
|| #################################################################### ||
\*======================================================================*/

// ####################### SET PHP ENVIRONMENT ###########################
error_reporting(E_ALL & ~E_NOTICE);

// #################### DEFINE IMPORTANT CONSTANTS #######################
define('NOSHUTDOWNFUNC', 1);
define('SKIP_SESSIONCREATE', 1);
define('DIE_QUIETLY', 1);
define('THIS_SCRIPT', 'forum_index_stub');
define('NOHEADER', 1);
define('NOZIP', 1);
define('NOCOOKIES', 1);
define('NOPMPOPUP', 1);
define('NONOTICES', 1);

// ################### PRE-CACHE TEMPLATES AND DATA ######################
// get special phrase groups
$phrasegroups = array();

// get special data templates from the datastore
$specialtemplates = array();

// pre-cache templates used by all actions
$globaltemplates = array();

// pre-cache templates used by specific actions
$actiontemplates = array();


// ######################### REQUIRE BACK-END ############################
require_once(dirname(__FILE__) . "/vb_dir.php");
chdir($vb_dir);
require_once('./global.php');

// #######################################################################
// ######################## START MAIN SCRIPT ############################
// #######################################################################

exec_header_redirect(fetch_seo_url('forumhome', array()));

/*======================================================================*\
|| ####################################################################
|| # Downloaded: 04:58, Mon May 6th 2019 : $Revision: 92140 $
|| # $Date: 2016-12-30 20:26:15 -0800 (Fri, 30 Dec 2016) $
|| ####################################################################
\*======================================================================*/
