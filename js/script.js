document.addEventListener("DOMContentLoaded", () => {
  // Ordering guidelines for categories that have subcategories
  const orderingGuidelines = {
    sunglasses: "For sunglasses, please ensure you specify the lens type and frame color. Orders must be placed by 10 AM local time.",
    watches: "For watches, please note that warranty details are included in the PDF. Verify model specifications before ordering.",
    lingerie: "For lingerie, please check our size guide and color availability. Orders are subject to stock confirmation.",
    accessorygiftset: "For accessory gift sets, please note minimum order quantities apply.",
    watchgiftset: "For watch gift sets, please verify packaging requirements before ordering."
  };

  const categoryElements = document.querySelectorAll('.category');
    
  categoryElements.forEach(category => {
    category.addEventListener('click', function () {
      const dataCategory = this.getAttribute('data-category');
      let subcategories = [];
      let folderName = '';
      
      // Define subcategories and correct folder names
      if (dataCategory === 'sunglasses') {
        subcategories = ['Kids Sunglass', 'Unisex Sunglasses'];
        folderName = 'Sunglasses';
      } else if (dataCategory === 'watches') {
        subcategories = ['Kids Watches', 'Men Watches', 'Women Watches'];
        folderName = 'Watches';
      } else if (dataCategory === 'lingerie') {
        subcategories = ['Baby Doll', 'Baby Doll Dress', 'Babydoll with Robe', 'Co-Ord Set Babydoll', 'Honey Moon Dress', 'Lingerie & Bikni Set', 'Premium Baby Doll'];
        folderName = 'Lingerie';
      } else if (dataCategory === 'accessorygiftset') {
        subcategories = ['Men Belt Wallet Set'];
        folderName = 'AccessoryGiftSet';
      } else if (dataCategory === 'watchgiftset') {
        subcategories = ['Men', 'Women'];
        folderName = 'WatchGiftSet';
      }
      
      // For categories with only one subcategory, open PDF directly
      if (subcategories.length === 1) {
        const pdfUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(`https://houseofbrands.github.io/sourcingwala/assets/Pdfs/${folderName}/${encodeURIComponent(subcategories[0])}.pdf`)}&embedded=true`;
        window.open(pdfUrl, '_blank');
        return;
      }
      
      // Build the subcategories overlay with ordering guidelines and heading
      const subCatContainer = document.querySelector('#subcategories .subcategories-content');
      const guidelinesText = orderingGuidelines[dataCategory] || "";
      subCatContainer.innerHTML = `<h2>Catalogue PDF Download</h2>
        <p class="ordering-guidelines">${guidelinesText}</p>
        <h3>Select your option:</h3>`;
      
      // Create subcategory buttons
      subcategories.forEach(sub => {
        const btn = document.createElement('button');
        btn.textContent = sub;
        btn.classList.add('sub-btn');
        btn.addEventListener('click', function () {
          const pdfUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(`https://houseofbrands.github.io/sourcingwala/assets/Pdfs/${folderName}/${encodeURIComponent(sub)}.pdf`)}&embedded=true`;
          window.open(pdfUrl, '_blank');
        });
        subCatContainer.appendChild(btn);
      });
      
      document.getElementById('subcategories').classList.remove('hidden');
    });
  });
  
  // Close the subcategories overlay
  document.getElementById('closeSubcategories').addEventListener('click', function () {
    document.getElementById('subcategories').classList.add('hidden');
  });
  
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('header nav');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
});