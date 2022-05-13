import Plugin from '@structures/plugin';
import { getByProps } from '@webpack';
import { create } from '@patcher';

const Patcher = create('hide-dm-buttons');

const { Timeout } = getByProps('Timeout') || {};

export default class HideDMButtons extends Plugin {
   start() {
      if (!Timeout) return;

      Patcher.after(Timeout.prototype, 'start', (self, [, callback]) => {
         if (callback?.toString().includes('BOT_CALL_IDLE_DISCONNECT')) {
            self.stop();
         };
      });
   }

   stop() {
      Patcher.unpatchAll();
   }
};
