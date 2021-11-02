class Portal {
    constructor(obj) {
        this.person = document.querySelector(obj.person);
        this.portal = document.querySelector(obj.portal);
        this.portal_right = document.querySelector(obj.portal_right);
        this.wrap_portal = document.querySelector(obj.wrap_portal);
    }

    locatePerson() {
        // Двигаем портал на уровень персоны
        let pers = this.person.getBoundingClientRect()
        this.wrap_portal.style.top = Math.floor(pers.top) + 'px';
        // Hidden portal & person1
        let wrap_portal = this.wrap_portal.getBoundingClientRect();
        if (pers.left >= wrap_portal.left) {
            this.person.style.left = '';
            this.person.style.animation = 'none';
            this.portal_right.classList.remove('opacity07');
            this.portal.classList.remove('opacity03');
        }
        // Show portal
        if (pers.left >= (wrap_portal.left - 300)
            && pers.left < wrap_portal.left) {
            this.portal_right.classList.add('opacity07');
            this.portal.classList.add('opacity03');
            setTimeout(() => {
                this.person.style.left = '';
                this.person.style.animation = '';
            }, 2000)
        }
    }
}