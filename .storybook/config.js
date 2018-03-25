import { configure } from '@storybook/react';
import '../src/client/less/app/application.less'

function loadStories() {
    require('./stories/Chat/chat');
}

configure(loadStories, module);