import { configure } from '@storybook/react';


function loadStories() {
    require('./stories/application')
}

configure(loadStories, module);