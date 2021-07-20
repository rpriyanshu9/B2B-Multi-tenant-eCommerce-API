# B2B-Multi-tenant-eCommerce-API

Run the app using the command 

__npm install__


__npm run dev__


heroku URL : 
https://rpriy-ecommerce-api.herokuapp.com/

Wherever auth is needed pass the jwt token returned after registering or logging in, in the header with key as `Authorization` and value as `Bearer <token>` (space in between Bearer and token).  
Example:
```
Authorization = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2ZTcxYTI4NTNhODA4OThlNmE0ZmUiLCJpYXQiOjE2MjY3OTM3NTR9.UWiOdht2OZcF4XEdEvIDsekfzl8IB0DiztfmC0C-2VM
```  

**Append the following routes to the above URL to test the API.**  

## For Website Owner:

### API: **(POST)** Add account : `/owner/register`  
*Sample request JSON:*  
```JSON
{
    "email":"owner1@gmail.com",
    "password":"owner1"
}
```  
---

### API: **(POST)** Add products : `/owner/addproduct`
***AUTH required***  
*Sample request JSON:*  
```JSON
{
    "name":"Taj Mahal Tea",
    "description":"Brooke Bond Taj Mahal is a product known for its unique flavor and aroma attained through the selection of the finest tea leaves available.",
    "price":135
}
``` 
---

### API: **(GET)** View Orders : `/owner/orders`
***AUTH required***  

---

## For End Customers:

### API: **(POST)** Add account : `/customer/register`
*Sample request JSON:*  
```JSON
{
    "email":"customer1@gmail.com",
    "password":"customer1"
}
```  
---

### API: **(POST)** Login : `/customer/login` 
*Sample request JSON:*  
```JSON
{
    "email":"customer1@gmail.com",
    "password":"customer1"
}
```  
---

### API: **(GET)** Browse Products : `/customer/products`
---

### API: **(POST)** Order products : `/customer/orderNew`
***AUTH required***  
*Sample request JSON:*  
```JSON
{
    "products":[
        {
            "product": "60f6e6682853a80898e6a4f3",
            "subTotal": 195,
            "quantity":3
        },
        {
            "product": "60f6e6932853a80898e6a4f6",
            "subTotal": 270,
            "quantity": 2
        }
    ],
    "total":465
}
```  
---

### API: **(GET)** View Orders : `/customer/orders`
***AUTH required***  

---

## Postman Collection
Link : https://bit.ly/2Tnj9l9
