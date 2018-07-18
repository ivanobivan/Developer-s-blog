import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Provider} from 'react-redux';
import configureStore from '../src/client/store/configureStore';
import horse from '../static/Horse.png';

const image = {
    src: horse,
    alt: 'my image',
};

const store = configureStore();


import Posts from '../src/client/components/Chess/ChessBoard';
import '../src/client/less/app/application.less';

storiesOf('Application', module)
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('Posts', () =>
        <Posts
            image={image}
        />);
