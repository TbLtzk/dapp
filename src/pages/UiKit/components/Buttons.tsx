import Button from 'ui/Button';
import { ButtonLook } from 'ui/Button/Button';
import Icon from 'ui/Icon';

function Buttons () {
  const buttonLooks: ButtonLook[] = ['primary', 'secondary', 'ghost', 'danger'];

  return (
    <div className="block">
      <h2 className="typo-h2">Buttons</h2>
      <div className="block-content">
        <div className="button-list">
          {buttonLooks.map((look) => (
            <div key={look} className="button-row">
              <Button look={look}>Button</Button>

              <Button look={look}>
                <Icon name="add" />
                <span>Button</span>
              </Button>

              <Button look={look}>
                <span>Button</span>
                <Icon name="add" />
              </Button>

              <Button loading look={look}>Loading…</Button>

              <Button disabled look={look}>Disabled</Button>
              <Button icon look={look}><Icon name="add" /></Button>
              <Button compact look={look}>Compact</Button>

              <Button compact look={look}>
                <Icon name="add" />
                <span>Compact</span>
              </Button>

              <Button
                compact
                loading
                look={look}
              >
                Loading…
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Buttons;
