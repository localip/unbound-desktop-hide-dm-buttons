import { getOwnerInstance } from '@utilities';
import { findByDisplayName } from '@webpack';
import Plugin from '@entities/plugin';

export default class extends Plugin {
   public items = [];

   start() {
      const PrivateChannelsList = findByDisplayName('ConnectedPrivateChannelsList', { interop: false });

      this.patcher.before(PrivateChannelsList, 'default', (_, [props]) => {
         if (props.children) {
            props.oChildren = props.children;
            props.children = props.children.filter(this.filter);
         }
      });

      this.update(true);
   }

   stop() {
      this.update();
   }

   filter(child) {
      return child?.key === 'friends';
   }

   update(filter = false) {
      const element = document.querySelector('[data-list-id*="private-channels"]');
      if (!element) return;

      const instance = getOwnerInstance(element);
      if (!instance?.props) return;

      if (filter) {
         instance.props.children = instance.props.children.filter(this.filter);
      } else if (instance.props.oChildren) {
         instance.props.children = instance.props.oChildren;
      }

      instance.forceUpdate?.();
   }
}