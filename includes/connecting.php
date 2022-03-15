<?php

$connection = mysqli_connect('127.0.0.1','root','','players');

if($connection == false){
    echo 'the request was unsuccsesful';
    die();
};

