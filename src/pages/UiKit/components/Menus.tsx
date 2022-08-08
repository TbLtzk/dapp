import { useState } from 'react';

import { motion } from 'framer-motion';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import MenuDropdown from 'ui/MenuDropdown';

function Menus () {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      id: 'stake-to-ranking',
      title: 'Stake to Ranking',
    },
    {
      id: 'announce-withdrawal',
      title: ' Announce Withdrawal',
    },
    {
      id: 'withdraw-from-ranking',
      title: 'Withdraw from Ranking',
      action: () => {},
    },
  ];

  return (
    <div className="block">
      <h2 className="text-h2">Menus (menu)</h2>
      <div className="block-content">
        <MenuDropdown
          open={open}
          menuItems={menuItems}
          trigger={
            <motion.div animate={{ rotate: open ? 270 : 90 }}>
              <Button icon look="secondary">
                <Icon name="chevron-right" />
              </Button>
            </motion.div>
          }
          onToggle={setOpen}
        />

      </div>
    </div>
  );
}

export default Menus;
