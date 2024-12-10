<?php

class Database
{
    private $mysqli;
    public function __construct()
    {
        $databaseHost = "localhost";
        $databaseName = "bakery";
        $databaseUsername = "root";
        $databasePassword = "";
        try {
            // Enable exceptions for mysqli 
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
            $this->mysqli = new mysqli($databaseHost, $databaseUsername, $databasePassword, $databaseName);
        } catch (mysqli_sql_exception $mysqliSqlException) {
            die("Connection faild" . $mysqliSqlException->getMessage());
        }
    }
    public function getConnection(): mysqli
    {
        return $this->mysqli;
    }

    public function __destruct()
    {
        $this->mysqli->close();
    }
}
