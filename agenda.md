
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


edit profile => page

notificaton  => page

messagerie => page

paramerte => page

mes annone , recommendation , visited , favorites , report 

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
##  create user
##  deconnexion
  

# EDIT_PROFILE
##  me
##  edite_me
##  get_account 
##  get_account_from_ids

# ROUTE PRODUCT
##  create_product
##  get_groduct
##  update_product
##  delete_product
##  get_product_from_ids
##  filter_product 
    valid_product
    reject_product

# ROUTE CGATEGORY  
##  create_category
##  get_groduct
##  update_category
##  delete_category
cascad
##  get_category_from_ids
##  categories_filter


# ROUTE_MODERATEUR
##  create_moderator
##  get_groduct
##  update_moderator
##  delete_moderator
##  get_moderator_from_ids
##  change_moderator_key
    moderator_filter

# ROUTE_ACTION_USER
##  report
##  favorites
##  recommendation
    link
    visited

# File_manage
## ceateFiles()
## updateFiles()
deleteFiles()

## use whatsapp 

Account_VALIDATION
admin_VALIDATION
auth_VALIDATION
categories_VALIDATION
favorites_VALIDATION
# Messenger_VALIDATION
Moderator_VALIDATION
Product_VALIDATION
Recommendation_VALIDATION
Reports_VALIDATION

## ROUTE_MESSENGER
## ROUTE_VOTE

MIN_MAX (le strict minimux pour le produit)

ROUTE_ADMIN
ROUTE_MEDRATOR
RULES ACL
PERMISSION

<!-- 5 / follow -->

ERROR

inFavorite

// db.inserte('account')
// db.inserte('category')
// db.inserte('product')
// db.inserte('report')
// db.inserte('recoomendation')
// db.inserte('favorites')
// db.inserte('visited')

ROUTE_TRANSATION

DOKER_IMAGE
TEST_VERCEL
HOSTINGER_PROD
TEST_PROD

resize image

type FieldOptions = {
  type: 'string' | 'number' | 'boolean' | 'date' | 'files';
  name: string;
  label: string,
  placeholder?: string;
  field: HTMLInputTypeAttribute;
  require?: boolean;
  default?: string;
  icon: string;
  match?: [string, string]; // regexString, i
  enum?: (string[] | number[]);
  min?: number;
  max?: number;
  maxSize?: number;
  mime?: (string | [string, number])[];
}[];