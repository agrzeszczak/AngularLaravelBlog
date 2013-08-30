<?php

/**
 * Description of Article
 *
 * @author Andrew Grzesczcak <agrzeszczak@andrewgrz.com>
 */

use Jenssegers\Mongodb\Model as Eloquent;

class Article extends Eloquent {

    protected $collection = 'articles';

}
