<?php
/*======================================================================*\
|| #################################################################### ||
|| # vBulletin Blog 4.2.5 - Licence Number VBF83FEF44
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2019 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| #        www.vbulletin.com | www.vbulletin.com/license.html        # ||
|| #################################################################### ||
\*======================================================================*/

// ######################## SET PHP ENVIRONMENT ###########################
error_reporting(E_ALL & ~E_NOTICE);
if (!is_object($vbulletin->db))
{
	exit;
}

$nodes = $vbulletin->db->query_read("
	SELECT nodeid
	FROM " . TABLE_PREFIX . "cms_node
	WHERE 
		new = 1
			AND
		lastupdated < " . (TIMENOW - 3600). "
");
while ($node = $vbulletin->db->fetch_array($nodes))
{
	$nodeitem = new vBCms_Item_Content($node['nodeid']);
	$class  = vB_Types::instance()->getContentClassFromId($nodeitem->getContentTypeID());
	$classname = $class['package']. '_Item_Content_' . $class['class'];

	if (class_exists($classname))
	{
		$nodeclass = new $classname($node['nodeid']);
	}
	else
	{
		$nodeclass = new vBCms_Item_Content($node['nodeid']);
	}

	$nodedm = $nodeclass->getDM();
	$nodedm->delete();	
}

log_cron_action('', $nextitem, 1);

/*======================================================================*\
|| ####################################################################
|| # Downloaded: 04:58, Mon May 6th 2019 : $Revision: 92140 $
|| # $Date: 2016-12-30 20:26:15 -0800 (Fri, 30 Dec 2016) $
|| ####################################################################
\*======================================================================*/
