

let app = new Vue({
            el: '#Task',
            data: {
                sitename: 'After School Classes',
                showProduct: true,
                order: {
                    name: '',
                    phoneNumber: '',
                    method: 'Home' ,
                    gift: '',
                    sendGift: 'Send as a gift',
                    dontSendGift: 'Do not send as a gift',
                    
                   
                
             }, 
            lessons:[],
            cart: [],
            sortBy: 'Subject',
            direction: 'Asending',
         
            },
            created() {
                this.getData();
            },

            methods: {
                    getData: function() {
                        this.lessons = data;
                    },

                    addToCartButton: function(lesson){
                        console.log(this.cart);
                        this.cart.push(lesson);
                        for(let i=0; i< this.lessons.length ; i++)
                        {
                            
                            if(this.lessons[i].id == lesson.id){
                                console.log(lesson.id);
                                console.log(this.lessons[i].id);
                                this.lessons[i].availableInventory--;
                            }
                        }
                    },
                    showCheckout(){
                        this.showProduct = this.showProduct ? false : true ;
                    }, 
                    submitForm: function(){
                        alert('Order Submitted!')
                    }, 
                    cartCount(id) {
                        let count = 0;
                        for(let i =0; i < cart.length; i++) {
                            if (this.cart[i] === id) {
                                count++;
                            }
                        }
                        return count;

                    },
                    
                    removeFromCartButton: function (lesson) {
                         
                        for(let i=0; i< this.cart.length;i++)
                        {
                            if(this.cart[i].id === lesson.id)
                            {
                                let start = this.cart.splice(0, i);
                                let finish = this.cart.splice(i+1, this.cart.length);
                                this.cart = [...start, ...finish];
                                for(let i=0; i< this.lessons.length;i++)
                                {
                                    if(this.lessons[i].id === lesson.id)
                                    {   
                                        
                                       this.lessons[i].availableInventory++;
                                    }
                                }
                                return;
                            }
                        }
                       
                       
                

                    },
                    isDisabled: function(lesson){
                        return lesson.availableInventory < 1;
                    },
                    isLetter: function(event){
                        if (/\d+/.test(event.key)) {
                           return event.preventDefault();
                        }

                    },
                    isNumber: function(event){
                        if (!/[0-9]/.test(event.key)) {
                           return event.preventDefault();
                        }
                    }
            },
            computed:  {

                cartItemCount: function() {
                     return this.cart.length || "";
                },
                canAddToCart(lesson) {
                   return lesson.availableInventory > this.cartItemCount(lesson.id);
                },
                canSubmitForm: function(){
                        if(this.cart.length > 0 && this.order.name != '' && this.order.phoneNumber != '')
                            return true ;
                        else
                            return false;   
                },
                itemsLeft () {
                    return this.lessons.availableInventory - this.cartItemCount;
                },
                sortedProducts() {
                    
                 return this.lessons.sort((a,b) => {
                    if(this.direction == 'Asending')
                    {
                        if(this.sortBy == 'Subject')
                        {   
                            if(a.subject > b.subject) return 1;
                             if(a.subject < b.subject) return -1;
                             return 0;

                        }
                        else if(this.sortBy == 'Location'){
                            if(a.location > b.location) return 1;
                            if(a.location < b.location) return -1;
                            return 0;
                        }
                        else if(this.sortBy == 'Price'){
                            if(parseInt(a.price) > parseInt(b.price)) return 1;
                            if(parseInt(a.price)< parseInt(b.price)) return -1;
                            return 0;
                        }
                        else if(this.sortBy == 'Availability'){
                            if(a.availableInventory > b.availableInventory) return 1;
                            if(a.availableInventory < b.availableInventory) return -1;
                            return 0;
                        }
                    }
                    else
                    {
                        if(this.sortBy == 'Subject')
                        {   
                            if(a.subject > b.subject) return -1;
                             if(a.subject < b.subject) return 1;
                             return 0;

                        }
                        else if(this.sortBy == 'Location'){
                            if(a.location > b.location) return -1;
                            if(a.location < b.location) return 1;
                            return 0;
                        }
                        else if(this.sortBy == 'Price'){
                            if(parseInt(a.price) > parseInt(b.price)) return -1;
                            if(parseInt(a.price)< parseInt(b.price)) return 1;
                            return 0;
                        }
                        else if(this.sortBy == 'Availability'){
                            if(a.availableInventory > b.availableInventory) return -1;
                            if(a.availableInventory < b.availableInventory) return 1;
                            return 0;
                        }

                    }

                 });

                }
                
            },
    });