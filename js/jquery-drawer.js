(function ($) {

    const idGenerator = (function* () {
        let i = 1;
        while (1) yield 'drwid' + (i++);
    })();

    function drwkeygen() {
        return idGenerator.next().value;
    }

    /**
     * Initialise une instance de drawer
     */
    $.fn.drawertest = function () {

        const root = this;


        // Construction de la liste des types
        const t = {
            _add: function (t_type) {
                this[t_type.id] = t_type;
            }
        };
        t._add(new DrawerElmType('sw', 'Switch'));
        t._add(new DrawerElmType('pa', 'PA'));
        t._add(new DrawerElmType('roc', 'Rocade'));
        t._add(new DrawerElmType('ond', 'Onduleur'));
        t._add(new DrawerElmType('ser', 'Serveur'));
        t._add(new DrawerElmType('lc', 'Local Technique', [t.sw, t.pa, t.roc, t.ond, t.ser]));
        t._add(new DrawerElmType('#', 'root', [t.lc]));

        console.log(t);


        // Construction de l'arbre
        let nd2 = new DrawerElmNode('root', t.root, [
            new DrawerElmNode('LC1', t.lc, [
                new DrawerElmNode('SW1', t.sw)
            ]),
            new DrawerElmNode('LC2')
        ]);

        console.log(nd2);

    };

    /**
     * Initialise une instance de drawer
     */
    $.fn.drawer = function (jsonUrl) {

        const rootnode = this;

        if (jsonUrl === undefined) jsonUrl = "js/data.json";

        //récupération du json
        $.getJSON(jsonUrl, null, function (data) {
            _creaelm(rootnode, data);
            console.log(gettailletree(data));
            console.log("taille de l'arbre");

        });


        function _creaelm(node, data) {

            // Création de l'arborescence principale
            const area = $('<drw-area>');
            const area_elm = $('<drw-area-elm>');
            const area_children = $('<drw-area-children>');

            const elm = $('<drw-elm>');

            const children_container = $('<drw-children-container>');


            data.forEach((contentType) => {

                const grp_id = drwkeygen();

                //On créé un couple drw-grp-name / drw-grp-members
                const name = $('<drw-grp-name>').attr('grp', '#' + grp_id).text(contentType.nom);
                const members = $('<drw-grp-members>').attr('id', grp_id);

                //Création des drw-grp-member
                contentType.members.forEach((m) => {

                    const member_id = drwkeygen();
                    const member = $('<drw-grp-member>').attr('child-pane', '#' + member_id).text(m.nom);

                    //On créer un nouvel espace
                    let child_pane = $('<drw-child-pane>').attr('id', member_id);

                    //Si type complexe
                    if (m.structure !== undefined) {
                        //Opération récursive
                        _creaelm(child_pane, m.structure);
                    } else if (m.data !== undefined && Object.keys(m.data).length !== 0) {
                        const elm_data = $("<drw-elm-data>");
                        const data = $("<drw-data>");
                        const dl = $("<dl>");

                        $.each(m.data, function (prop, val) {
                            dl.append($("<dt>").text(prop))
                                .append($("<dd>").text(val));
                        });

                        data.append(dl);
                        elm_data.html(data);
                        child_pane.html(elm_data);
                    }

                    members.append(member);
                    children_container.append(child_pane);

                });

                //Création du drw-member-add
                const add = $('<drw-member-add>');
                members.append(add);

                elm.append(name).append(members);


            });


            //Inclusions
            area_elm.html(elm);
            area_children.html(children_container);
            area.append(area_elm).append(area_children);
            node.html(area);


        }


    };


})(jQuery);

function gettailletree(data) {
    let taille_max_fils = 0;

    data.forEach((type) => {
        type.members.forEach(member => {
            if (member.structure !== undefined) {
                let taille_current_fils = gettailletree(member.structure);
                if (taille_current_fils > taille_max_fils) taille_max_fils = taille_current_fils;
            } else if (member.data !== undefined && member.data.length !== 0) {
                if (taille_max_fils < 1) taille_max_fils = 1;
            }
        });
    });

    return taille_max_fils + 1;
}


// OLD


class DrawerElmNode {

    constructor(name, type, content, id) {
        this.name = name;
        this.type = type;
        this.content = content === undefined ? null : content;
        this.id = id === undefined ? null : id;
    }

}


class DrawerElmType {
    constructor(id, name, types) {
        this.id = id;
        this.name = name;
        this.contains = types
    }
}
