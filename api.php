<?php
/**
 * Created by PhpStorm.
 * User: slivinskas
 * Date: 2017-03-11
 * Time: 07:56
 */

$config =  include_once ("config.php");
include_once ("libary/DB.c  lass.php");

$db = new DB($config->host,$config->user,$config->pass,$config->db);

// create a new cURL resource
$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, "http://www.example.com/");
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);