import { getByDisplayName } from '@webpack';
import Plugin from '@structures/plugin';
import { create } from '@patcher';

const Patcher = create('hide-dm-buttons');

export default class HideDMButtons extends Plugin {
   start(): void {
      const DMsList: Object = getByDisplayName('ConnectedPrivateChannelsList', { default: false });
      Patcher.before(DMsList, 'default', (_, [props]) => {
         if (props?.children) {
            props.children = props.children.filter(a => a?.key == 'friends');
         }
      });
   }

   stop(): void {
      Patcher.unpatchAll();
   }
};
