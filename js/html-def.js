class DrawerElement extends HTMLElement {

    constructor()
    {
        super();

        this.initialClass = [];
        this.initialAttributes = [];
        this.initialAttributesReplacements = [];
        this.initialChildren = [];
        this.initialCallbacks = [];
    }

    connectedCallback()
    {
        let elm = this;

        // Class initiales
        this.initialClass.forEach(function (c) {
            elm.classList.add(c);
        });

        // Autres attributs
        this.initialAttributes.forEach(function (obj) {
            let key = Object.keys(obj)[0];
            let val = Object.values(obj)[0];
            console.log(`Attributs : ${key}:${val}`);
            elm.setAttribute(key, val);
        });

        //Attributs replacements
        this.initialAttributesReplacements.forEach(function (obj) {
            if(elm.hasAttribute(obj.before.key))
            {
                if(obj.after.val === undefined) obj.after.val = elm.getAttribute(obj.before.key);
                elm.setAttribute(obj.after.key, obj.after.val);
                if(obj.replace === true) elm.removeAttribute(obj.before.key);
            }
        });

            // Children
        this.initialChildren.forEach(function (nd) {
            elm.append(nd);
        });

        // Fonctions
        this.initialCallbacks.forEach(function (f) {
            f(elm);
        });

    }

    addInitialClass(classe)
    {
        if(Array.isArray(classe))
        {
            let elm = this;
            classe.forEach(function (c) {
                elm.initialClass.push(c);
            });
        }
        else if(typeof classe === "string")
        {
            this.initialClass.push(classe);
        }
    }


    addInitialAttribute(attr, val)
    {
        this.initialAttributes.push(JSON.parse(`{"${attr}":"${val}"}`));
    }

    replaceInitialAttribute(b_key, a_key, a_val, erase_old)
    {
        if(erase_old === undefined) erase_old = false;
        this.initialAttributesReplacements.push({
            before: {
                key: b_key
            },
            after: {
                key: a_key,
                val: a_val
            },
            replace: erase_old
        });
    }

    addInitialCallback(c)
    {
        this.initialCallbacks.push(c);
    }

    addInitialChildren(node)
    {
        this.initialChildren.push(node);
    }


}


/**
 * drw-area
 *
 */
window.customElements.define("drw-area", class extends DrawerElement {
    constructor()
    {
        super();
        this.addInitialClass("row");
    }
});


/**
 * drw-area-elm
 *
 */
window.customElements.define("drw-area-elm", class extends DrawerElement {
    constructor()
    {
        super();
        this.addInitialClass("col-6");
    }
});


/**
 * drw-area-content
 *
 *
 */
window.customElements.define("drw-area-children", class extends DrawerElement {
    constructor()
    {
        super();
        this.addInitialClass("col-6");
    }
});


/**
 * drw-elm
 *
 *
 */
window.customElements.define("drw-elm", class  extends DrawerElement {
    constructor()
    {
        super();
        this.addInitialClass('card');
        this.addInitialAttribute('role', 'tablist');
    }
});


/**
 * drw-grp-name
 *
 *
 */
window.customElements.define("drw-grp-name", class  extends DrawerElement {
    constructor()
    {
        super();

        this.grp_member_attached = null;

        this.addInitialClass('card-header');
        this.addInitialAttribute('data-toggle', 'collapse');

        this.replaceInitialAttribute("grp", "data-target")

    }
});


/**
 * drw-grp-members
 *
 *
 */
window.customElements.define("drw-grp-members", class extends DrawerElement {
    constructor()
    {
        super();

        this.addInitialClass('list-group');
        this.addInitialClass('list-group-flush');
        this.addInitialClass('collapse');

    }
});


/**
 * drw-grp-member
 *
 *
 */
window.customElements.define("drw-grp-member", class extends DrawerElement {
    constructor()
    {
        super();

        this.addInitialClass('list-group-item');
        this.addInitialClass('list-group-item-action');

        this.addInitialAttribute('role', 'tab');
        this.addInitialAttribute('data-toggle', 'list');

        this.replaceInitialAttribute("child-pane", "data-target")


    }
});


/**
 * drw-member-_add
 *
 *
 */
window.customElements.define("drw-member-add", class extends DrawerElement {
    constructor()
    {
        super();

        let spanplus = document.createElement('span');
        spanplus.className = 'fas fa-plus';
        this.addInitialChildren(spanplus);


        this.addInitialClass('list-group-item');
        this.addInitialClass('list-group-item-action');
    }
});


/**
 * drw-content-container
 *
 *
 */
window.customElements.define("drw-children-container", class extends DrawerElement {
    constructor()
    {
        super();

        this.addInitialClass('tab-content');

    }
});


/**
 * drw-child-pane
 *
 *
 */
window.customElements.define("drw-child-pane", class extends DrawerElement {
    constructor()
    {
        super();

        this.addInitialClass('tab-pane');
        this.addInitialClass('fade');

        this.addInitialAttribute('role', 'tabpanel');

    }
});


/**
 * drw-elm-data
 *
 *
 */
window.customElements.define("drw-elm-data", class extends DrawerElement {
    constructor() {
        super();

        this.addInitialClass('card');

    }
});


/**
 * drw-data
 *
 *
 */
window.customElements.define("drw-data", class extends DrawerElement {
    constructor() {
        super();
        this.addInitialClass('card-body');
    }
});




