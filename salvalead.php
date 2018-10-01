<?php
file_put_contents('logs.txt', file_get_contents('php://input').PHP_EOL, FILE_APPEND | LOCK_EX);
