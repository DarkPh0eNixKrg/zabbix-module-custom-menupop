<?php

namespace Modules\custom_menupopup;

use Core\CModule as CModule;
use CController as CAction;
use APP;

class Module extends CModule {
    public function onTerminate(CAction $action): void {
        $action_page = $action->getAction();
        $router = clone APP::Component()->get('router');
        $layout = $router->getLayout();
        if ($action_page) {
            if ($action_page == 'dashboard.view'
                || $action_page == 'problem.view'
                || $action_page == 'host.view'
                || $action_page == 'latest.view'
                || $action_page == 'map.view'
            ) {
                echo '<script type="text/javascript">';
                echo file_get_contents(__DIR__.'/js/custom_menupopup.js');
                echo '</script>';
            }
        }
    }
}
