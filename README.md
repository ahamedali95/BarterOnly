# BarterOnly

BarterOnly is *single-page*, *full-stack* web application built using **ReactJS** and **Ruby on Rails**. It is an ecommerce platform where customers can list items they no longer need in exchange for cash or an exchange item. Customers can search the marketplace with hundreds of items, sort products based on certain attributes(date, price, rating) and categorize items. After acquiring an account, customers can either make a purchase for the full value of product or acquire item by making an exchange. A key feature of this platform is that it automatically matches a customer with other customers who are looking for items that they have. In combination with ReactJS, BarterOnly uses **Redux** - a state management React library to hold the state of the front-end application in a single store so that any component can have access or modify the global state, effectively eliminates passing of props from parent to child. Additionally, BarterOnly utilizes **dynamic routing using React Routers**, **RESTful JSON API using Rails** to give a feel of a dynamic web application. Moreover, this application implements the core concept of relational database as a foundation to relate data to one another so that information can be efficiently retrieved. The relationships are formed using ActiveRecord associations.

Following is the Entity Relationship Diagram that describes the entities/models and associations between these entities:

![imageedit_8_6919085673](https://user-images.githubusercontent.com/24445922/42916049-3a2a0bc2-8ad1-11e8-96ae-2e9f9190f662.png)

Following is the tree-like React Component Hierarchy that describes the component structure of the application's front-end:

<pre>
 ┬  
 ├ App
     ┬  
     ├  NavBar
     ├  LoginForm
     ├  UserRegisterForm
     ├  ProductListingContainer
         ┬  
         ├  Categories
         ├  SearchField
         ├  SortSelection
         └  ProductListingsCollection
     ├  PrivateProductListings
     ├  MatchingProductListings
     └  PurchasedProducts
</pre>

### Notable Tools:
  - **Semantic UI React** - a React framework to add responsive web design to the front-end
  - **JSON Web Token** - a token-based system used for authenticating users and authorizing certain API routes
  - **React Dropzone** - a React library used for managing client-side file upload
  - **Rack Cors** - a Rails gem that allows support for Cross-Origin Resource Sharing(CORS) to allow the resources of a Rails web server to be accessed by a web page from a different domain
  - **Serializer** - a Rails gem that allows to build JSON APIs through serializer objects. This provides a dedicated place to fully customize the JSON output
  - **Bcrypt** - a Ruby gem that allows to store sensitive information such as passwords in the back-end after hashing

**Link to back-end application:** https://github.com/ahamedali95/BarterOnly-back-end

### Demo:

![watch this video](https://img.youtube.com/vi/eLFKI7i8_Xw/0.jpg)(https://youtu.be/eLFKI7i8_Xw)

### Instructions
To start, run ```npm install``` && ```npm start``` to get the app up and running. This will start the app at PORT 3000. To designate a different port number for the app, modify the scripts in package.json from ```"start": "react-scripts start"``` to ```"start": "PORT={PORT NO.} react-scripts start"```
