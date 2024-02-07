
- analyser la concurence
- cree les tables ( schema )
- cree les table ( DB )
- s'inpirer d'avito pour les paramertre

 FRONT_END 
 ```jsx
* PAGE_AUTH 


PAGE_EDIT_MY_PROFILE
*PAGE_MY_PROFILE
*PAGE_OTHER_PROFILE

PAGE_CREATE_PRODUCT 
PAGE_EDIT_PRODUCT
PAGE_DETAIL_PRODUCT

PAGE_MAIN (  COMP_CATEGORY , COMP_FILTER , COM_PRODUCT ) 
NAV_FILTER 


SUB_PAGE_FAVORITES
SUB_PAGE_HISTORY ( my_annonce, recommendation(product / account {view , clik}) ,visited_product (15) , visited_account (15)   )


COMP_UDGRADE_TO_URGENT

SUB_PAGE_MESSAGE
COMP_MESSAGE
COMP_VOTE  ( 'the vote component will appreare inside the  product, when provider answered to you first message about product') ( revote_enable)


SUB_PAGE_PARAMETER  ( dark_mode ,  )
```

ROUTE = 'creation de route +  creation du test'

# ROUTE_AUTH
##  connexion
    access : any / status : end  /
##  create user
    access : any / status : end  /
##  deconnexion
    access : any / status : end  /

# EDIT_PROFILE
##  me
    access : any / status : end  /
##  edite_me
##  get_account 
##  get_account_from_ids
    accounnt_filter_filter

# ROUTE PRODUCT
##  create_product
##  get_groduct
##  update_product
##  delete_product
##  get_product_from_ids
    valid_product
    reject_product
    products_filter 

# ROUTE CGATEGORY  
##  create_category
##  get_groduct
##  update_category
##  delete_category
##  get_category_from_ids
    categories_filter
// inserte('category')

# ROUTE_MODERATEUR
##  create_moderator
##  get_groduct
##  update_moderator
##  delete_moderator
##  get_moderator_from_ids
##  change_moderator_key
    moderator_filter

ROUTE_ADMIN

ROUTE_MESSENGER
ROUTE_VOTE

ROUTE_ACTION_USER ( recommendation @ , visited @, favorites , report )

VALIDATION
PERMISSION
ERROR

ROUTE_TRANSATION

DOKER_IMAGE
TEST_VERCEL
HOSTINGER_PROD
TEST_PROD





edit profile => page

notificaton  => page

messagerie => page

paramerte => page

mes annone , recommendation , visited , favorites , report 

++++++++++++++++++++++++++++++++++++++++++

++++++++++++++++++++++++++++++++++++++++++

++++++++++++++++++++++++++++++++++++++++++

++++++++++++++++++++++++++++++++++++++++++

++++++++++++++++++++++++++++++++++++++++++
            1  ,  2 ,  3 ,  4 ->
_______________________________________________________________

recommendation

++++++  ++++++++  ++++++   +++++++

visited
 
++++++  ++++++++  ++++++   +++++++

favorites
  
++++++  ++++++++  ++++++   +++++++

report

++++++  ++++++++  ++++++   +++++++
```json
[{ 
    "type":"string",
    "name": "noga",
    "placeholder": "by ng",
    "field":"textarea",
    "require":true,
   // "default":"string",
    "icon":"url",
    //"lowercase" : true,
    "uppercase":true,
    "capitalize":true,
    "trim":true,
    "match":["regexString","i"],
    "enum":["azerty","piokioulou"],
    "minLength":10,
    "maxLength":100
},{
    "type":"booean",
    "name": "isValid",
    "placeholder": "is Valid product",
    "field":"input",
    "require":true,
    "default":false,
    "icon":"url"
},{
    "type":"number",
    "name": "volume",
    "placeholder": "Volume",
    "field":"input",
    "require":true,
    "default":30,
    "icon":"url",
    "enum":[30,50,75],
    "min":30,
    "max":75 
},{
    "type":"date",
    "name": "date d'acquisition",
    "placeholder": "yyyy-mm-dd",
    "field":"input",
    "require":true,
    "default":"2024-02-05",
    "icon":"url",
    //"enum":["2024-02-05","2024-02-06"..],
    "min":"2024-02-01",
    "max":"2024-02-14" 
},{
    "type":"files",
    "name": "piscture",
    "placeholder": "picture",
    "field":"input",
    "require":true,
    "min":1,
    "max":100,
    "maxSize":1000000,
    "mime":["image/png",["video/mp4",12000000]]
}]
```