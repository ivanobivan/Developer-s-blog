import { configure } from '@storybook/react';


function loadStories() {
    require('./stories/Chat/chat');
}

configure(loadStories, module);