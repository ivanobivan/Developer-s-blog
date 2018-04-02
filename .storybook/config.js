import { configure } from '@storybook/react';


function loadStories() {
    //require('./stories/Chat/chat');
    require('./stories/application')
}

configure(loadStories, module);