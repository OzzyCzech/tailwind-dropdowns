/**
 * Tailwind dropdowns
 *
 * ```
 * <button data-dropdown="menu" data-placement="bottom-end">Show menu</button>
 *
 * <nav id="menu">
 *   <a href="/">Homepage</a>
 * </nav>
 * ```
 *
 * Button attributes:
 *
 * data-dropdown="[ID of element]"
 * data-placement="[placement]"
 *
 * @see https://popper.js.org/
 */
 import {createPopper} from '@popperjs/core/lib/popper-lite.js';
 import flip from '@popperjs/core/lib/modifiers/flip.js';
 import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
 
 /**
  * Add dropdown to button
  * @param button
  */
 export function addDropdown(button) {
   const menu = document.querySelector(`#${button.dataset.dropdown}`);
 
   // Popper create instance
   const popper = createPopper(button, menu, {
     placement: button.dataset.placement || 'bottom-start',
     modifiers: [flip, preventOverflow],
   });
 
   // toggle menu on button click
   button.addEventListener('click', async event => {
     const menu = document.querySelector(`#${event.target.dataset.dropdown}`);
     menu.classList.toggle('hidden');
     event.target.setAttribute('aria-expanded', !menu.classList.contains('hidden'));
 
     await popper.update(); // reposition
 
     // close dropdown menu on Escape or click somewhere else
     function closeMenu(event) {
       if (event.type === 'click' && (event.target !== button || event.key === 'Escape')) {
         menu.classList.add('hidden');
         button.setAttribute('aria-expanded', false);
 
         // remove close menu handlers
         document.removeEventListener('click', closeMenu);
         document.removeEventListener('keydown', closeMenu);
       }
     }
 
     document.addEventListener('click', closeMenu);
     document.addEventListener('keydown', closeMenu);
   });
 }
 
 // let's add dropdown menu to all buttons
for (const button of document.querySelectorAll('[data-dropdown]')) {
  addDropdown(button);
}
