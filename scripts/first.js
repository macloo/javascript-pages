// vanilla JS - no jQuery
// ref: https://plainjs.com/javascript/

// is the DOM ready? from plainjs.com - run main function when ready
// in case the document is already rendered
if (document.readyState != 'loading') {
    setupSections();
// modern browsers
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', setupSections);
// IE <= 8
} else {
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState == 'complete') {
            setupSections();
        }
    });
}

// set section heights, hide them all, show first
function setupSections() {
    // put all sections into an array
    const allSections = document.querySelectorAll('section');

    // make all sections same height as window, then hide them all
    allSections.forEach(function(item) {
        item.style.height = String(window.innerHeight) + "px";
        if (item !== allSections[0]) {
            // add back button above all content inside section
            // back button will not appear if no JS
            let back = document.createElement('span');
            back.setAttribute('class', 'back');
            back.textContent = 'BACK';
            item.insertBefore(back, item.childNodes[0]);
        }
        // hide section
        item.style.display = "none";
    });

    // show the first section only
    allSections[0].style.display = "block";

    // create menu
    writeLinks(allSections);

} // end function setupSections

// write the menu using info from HTML
function writeLinks(allSections) {
    const titles = [];
    allSections.forEach(function(item) {
        // get text from h2 and add to array
        heading = item.childNodes[2].textContent;
        titles.push(heading);
    });
    // replace first list item
    titles[0] = allSections[0].childNodes[1].textContent;
    // get UL for menu list
    const linksList = document.querySelector('#links-list');
    // create all LI links - bit by bit
    titles.forEach(function(item, index) {
        let li = document.createElement('li');
        li.setAttribute('class', 'menu');
        let a = document.createElement('a');
        a.append(`${item}`);
        a.setAttribute('href', '#');
        a.setAttribute('data-index', `${index}`);
        li.append(a);
        linksList.append(li);
        // reference -
        // `<li><a href='#' data-index='${index}'>${item}</a></li>`
    });
}

// sliding side menu - uses CSS animation
function slideMenu() {
    const menu = document.querySelector('#slider');

    // check parameter
    // console.log(menu.offsetWidth);

    // menu slides in or out if clicked - classes change
    if (menu.classList.contains('slide-to-view')) {
       menu.classList.remove('slide-to-view');
       menu.classList.add('slide-out-of-view');
       // reposition menu in its css rule
       if (menu.offsetWidth == 420) {
           menu.style.left = "-420px";
       } else {
           menu.style.top = "-100vh";
       }
    } else if (menu.classList.contains('slide-out-of-view')) {
        menu.classList.remove('slide-out-of-view');
        menu.classList.add('slide-to-view');
        // reposition menu in its css rule
        if (menu.offsetWidth == 420) {
            menu.style.left = "0";
        } else {
            menu.style.top = "0";
        }
    } else {
        menu.classList.add('slide-to-view');
        // reposition menu in its css rule
        if (menu.offsetWidth == 420) {
            menu.style.left = "0";
        } else {
            menu.style.top = "0";
        }
    }
} // end function slideMenu

// do this if a link is clicked
function followLinks(allSections, e) {
    let dest = e.target.getAttribute('href');
    if (dest == '#') {
        // if link in -menu- is clicked - read the data attribute
        e.preventDefault();
        const next = allSections[e.target.dataset.index];
        // there is no usable value in current, so hide all
        allSections.forEach(function(item) {
            item.style.display = "none";
        });
        next.style.display = "block";
        // close menu
        slideMenu();
    }
    // note, we don't need an else to make other A links act normally
} // end function followLinks

// listen for any click, change to next section
document.body.addEventListener("click", function(e) {
    // designate the current section
    if (e.target.nodeName == "SECTION") {
        current = e.target;
    } else {
        current = e.target.closest('section');
    }

    // put all sections into an array
    const allSections = document.querySelectorAll('section');

    // what to do depending on what was clicked
    if (e.target.nodeName == "SPAN") {
        // go back one if they clicked the span
        const prev = current.previousSibling.previousSibling;
        prev.style.display = "block";
        current.style.display = "none";
    } else if (e.target.nodeName == "A") {
        // if link is clicked - function
        followLinks(allSections, e);
    } else if (e.target.classList.contains('menu')) {
        // function controls menu sliding in or out
        slideMenu();
    } else if (current === allSections[allSections.length - 1]) {
        // if we are on the -final- section
        msgArea = current.offsetWidth;
        const msg = document.querySelector('#message');
        // size the box
        msg.style.width = (msgArea / 2) + 'px';
        msg.style.left = (msgArea / 4)  + 'px';
        msg.style.display = "block";
        // hide the box after 2 seconds
        window.setTimeout( function() { msg.style.display = "none"; }, 2000);
    } else {
        // go forward one, in all other cases
        const next = current.nextSibling.nextSibling;
        next.style.display = "block";
        current.style.display = "none";
    }
});
