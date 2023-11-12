// vue js app for purchasing after school lessons
let app = new Vue({
    el: '#Task',
    data: {
        sitename: 'After School Classes',
        showProduct: true,
        order: {
            name: '',
            phoneNumber: '',
            method: 'Home',
            gift: '',
            sendGift: 'Send as a gift',
            dontSendGift: 'Do not send as a gift',



        },
        lessons: [],
        cart: [],
        sortBy: 'Subject',
        direction: 'Asending',
        searchLesson: ''

    },
    created() {
        this.getData();
    },

    methods: {
        //the data that comes from the data array in lessons.js
        getData: function () {
            this.lessons = data;
        },
        //adding to cart and updating the availabilty of lessons
        addToCartButton: function (lesson) {
            console.log(this.cart);
            this.cart.push(lesson);
            for (let i = 0; i < this.lessons.length; i++) {

                if (this.lessons[i].id == lesson.id) {
                    console.log(lesson.id);
                    console.log(this.lessons[i].id);
                    this.lessons[i].availableInventory--;
                }
            }
        },
        //product is visable 
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },
        //shows message when user submits form 
        submitForm: function () {
            alert('Order Submitted!')
        },
        //a function that removes lesson from cart 
        removeFromCartButton: function (lesson) {

            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === lesson.id) {
                    let start = this.cart.splice(0, i);
                    let finish = this.cart.splice(i + 1, this.cart.length);
                    this.cart = [...start, ...finish];
                    for (let i = 0; i < this.lessons.length; i++) {
                        if (this.lessons[i].id === lesson.id) {

                            this.lessons[i].availableInventory++;
                        }
                    }
                    return;
                }
            }
        },
        //button becomes disables when there is no more lessons left
        isDisabled: function (lesson) {
            return lesson.availableInventory < 1;
        },
        //regular expressions for letter validation, to check that the user is only inputing a letter 
        isLetter: function (event) {
            if (/\d+/.test(event.key)) {
                return event.preventDefault();
            }

        },
        ////regular expressions for number validation, to check that the user is only inputing a number 
        isNumber: function (event) {
            if (!/[0-9]/.test(event.key)) {
                return event.preventDefault();
            }
        },
        
    },
    computed: {
        //function that counts the item in the cart 
        cartItemCount: function () {
            return this.cart.length || "";
        },
        //the user will be able to add to cart if there availablitly for the lesson is biger than 0
        canAddToCart(lesson) {
            return lesson.availableInventory > this.cartItemCount(lesson.id);
        },
        //the submit button will only be visable once the user has entered name and phone number
        canSubmitForm: function () {
            if (this.cart.length > 0 && this.order.name != '' && this.order.phoneNumber != '')
                return true;
            else
                return false;
        },
        //after the user adds lessons to cart the availabilty gets decreased
        itemsLeft() {
            return this.lessons.availableInventory - this.cartItemCount;
        },
        //sorting the lessons by subject,location,price and availability in ascending and descending order
        sortedProducts() {

            return this.lessons.sort((a, b) => {
                if (this.direction == 'Asending') {
                    if (this.sortBy == 'Subject') {
                        if (a.subject > b.subject) return 1;
                        if (a.subject < b.subject) return -1;
                        return 0;

                    }
                    else if (this.sortBy == 'Location') {
                        if (a.location > b.location) return 1;
                        if (a.location < b.location) return -1;
                        return 0;
                    }
                    else if (this.sortBy == 'Price') {
                        if (parseInt(a.price) > parseInt(b.price)) return 1;
                        if (parseInt(a.price) < parseInt(b.price)) return -1;
                        return 0;
                    }
                    else if (this.sortBy == 'Availability') {
                        if (a.availableInventory > b.availableInventory) return 1;
                        if (a.availableInventory < b.availableInventory) return -1;
                        return 0;
                    }
                }
                else {
                    if (this.sortBy == 'Subject') {
                        if (a.subject > b.subject) return -1;
                        if (a.subject < b.subject) return 1;
                        return 0;

                    }
                    else if (this.sortBy == 'Location') {
                        if (a.location > b.location) return -1;
                        if (a.location < b.location) return 1;
                        return 0;
                    }
                    else if (this.sortBy == 'Price') {
                        if (parseInt(a.price) > parseInt(b.price)) return -1;
                        if (parseInt(a.price) < parseInt(b.price)) return 1;
                        return 0;
                    }
                    else if (this.sortBy == 'Availability') {
                        if (a.availableInventory > b.availableInventory) return -1;
                        if (a.availableInventory < b.availableInventory) return 1;
                        return 0;
                    }

                }

            });

        },
         //search functionality
         filteredLessons() {
            return this.sortedProducts.filter((lesson) => {
                return lesson.subject.match(this.searchLesson);
            });
        },


    },
});