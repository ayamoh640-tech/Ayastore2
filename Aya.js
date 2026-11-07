/* =========================================================
   Aya Beauty: small interactions for the demo page
   - "Add" buttons update the bag counter
   - Heart buttons save products to the wishlist
   - The search box highlights matching products
   - Forms show a confirmation instead of sending anything
   ========================================================= */

   const bagCount = document.getElementById('bag-count');
   const wishCount = document.getElementById('wish-count');
   const toast = document.getElementById('toast');
   let bagItems = 0;
   let toastTimer;
   
   /* Short message at the bottom of the screen */
   function showToast(message) {
     toast.textContent = message;
     toast.classList.add('is-visible');
     clearTimeout(toastTimer);
     toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
   }
   
   /* Add to bag */
   document.querySelectorAll('[data-add]').forEach((button) => {
     button.addEventListener('click', () => {
       bagItems += 1;
       bagCount.textContent = bagItems;
       showToast(`Added ${button.dataset.add} to your bag`);
   
       const label = button.querySelector('.btn-label');
       if (label && !button.classList.contains('is-added')) {
         const original = label.textContent;
         label.textContent = 'Added';
         button.classList.add('is-added');
         setTimeout(() => {
           label.textContent = original;
           button.classList.remove('is-added');
         }, 1400);
       }
     });
   });
   
   /* Wishlist hearts */
   document.querySelectorAll('.wish').forEach((button) => {
     button.addEventListener('click', () => {
       const saved = button.getAttribute('aria-pressed') !== 'true';
       button.setAttribute('aria-pressed', String(saved));
       const total = document.querySelectorAll('.wish[aria-pressed="true"]').length;
       wishCount.textContent = total;
       wishCount.hidden = total === 0;
       showToast(saved ? 'Saved to your wishlist' : 'Removed from your wishlist');
     });
   });
   
   document.getElementById('wish-button').addEventListener('click', () => {
     const total = document.querySelectorAll('.wish[aria-pressed="true"]').length;
     showToast(total ? `You saved ${total} product${total === 1 ? '' : 's'}` : 'Tap the heart on a product to save it');
   });
   
   document.getElementById('bag-button').addEventListener('click', () => {
     showToast(bagItems
       ? `Your bag has ${bagItems} item${bagItems === 1 ? '' : 's'}. Checkout is not part of this demo.`
       : 'Your bag is empty. Use the Add buttons to fill it.');
   });
   
   /* Search: highlight matching products and scroll to the first one */
   const searchForm = document.getElementById('search-form');
   const searchInput = document.getElementById('site-search');
   const clearMatches = () => document.querySelectorAll('.product.is-match').forEach((p) => p.classList.remove('is-match'));
   
   searchForm.addEventListener('submit', (event) => {
     event.preventDefault();
     clearMatches();
     const typed = searchInput.value.trim();
     if (!typed) return;
     const query = typed.toLowerCase();
     const matches = [...document.querySelectorAll('.product')].filter((p) => p.dataset.search.includes(query));
     if (!matches.length) {
       showToast(`No products match "${typed}"`);
       return;
     }
     matches.forEach((p) => p.classList.add('is-match'));
     matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
     showToast(`${matches.length} product${matches.length === 1 ? '' : 's'} match "${typed}"`);
   });
   searchInput.addEventListener('input', () => {
     if (!searchInput.value.trim()) clearMatches();
   });
   
   /* Contact and newsletter forms: demo confirmation only */
   document.querySelectorAll('form[data-demo-message]').forEach((form) => {
     form.addEventListener('submit', (event) => {
       event.preventDefault();
       if (!form.checkValidity()) {
         form.reportValidity();
         return;
       }
       form.querySelector('.form-note').textContent = form.dataset.demoMessage;
       form.reset();
     });
   });