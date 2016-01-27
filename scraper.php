<?php

$html = file_get_contents('http://menus.tufts.edu/foodpro/shortmenu.asp?sName=TUFTS+DINING&locationNum=11&locationName=Dewick-MacPhie+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=1%2F24%2F2016');
$food_doc = new DOMDocument();
libxml_use_internal_errors(TRUE); //disable libxml errors

if(!empty($html)){ //if any html is actually returned
  $food_doc->loadHTML($html);
  libxml_clear_errors(); //remove errors for yucky html
  $food_xpath = new DOMXPath($food_doc);
  
  $food_list = array();
  $food_and_type = $food_xpath->query('//td[@width="30%"]');
  
  if($food_and_type->length > 0){
    foreach($food_and_type as $pat){
      
      //get the category
      $category = $food_xpath->query('//div[@class="shortmenucats"]', $pat)->item(0)->nodeValue;
      
      $food_items = array(); //reset $food_types for each food
      
      $items = $food_xpath->query('//a[@name="Recipe_Desc"]', $pat);
      
      //loop through all the types and store them in the $food_types array
      foreach($items as $item){
          $food_items[] = $item->nodeValue; //the food type
      }
      
      //store the data in the $food_list array
      $food_list[] = array('category' => $category, 'items' => $food_items);
      
    }
  }

//output what we have
echo "<pre>";
print_r($food_list);
echo "</pre>";
}


/*
  $html = file_get_contents('http://menus.tufts.edu/foodpro/shortmenu.asp?sName=TUFTS+DINING&locationNum=11&locationName=Dewick-MacPhie+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=5%2F4%2F2015');
$dining_doc = new DOMDocument();

if(!empty($html)){
  $dining_doc->loadHTML($html);
  $dining_xpath = new DOMXPath($dining_doc);
  $json = new DOMDocument();
  
  $dining_list = array();
  
  foreach($dining_xpath->query('//table[@width="100%"]') as $table) {
    $category = $dining_xpath->query('//div[@class="shortmenucats"]', $table)->item(0)->nodeValue;
    echo $category . "<br/>";
    
    $foodarray = array();
    $foodname = $dining_xpath->query('//a[@name="Recipe_Desc"]', $table)
    echo $category . "<br/>";
    
    foreach($foodname as $fooditem) {
      $foodarray[] = $fooditem->nodeValue();
    }
    
    //$name = $dining_xpath->query('//a[@name="Recipe_Desc"]', $table)->item(0)->nodeValue;
    //echo $name . "<br/>";
    
    $dining_list[] = array('category' => $category, 'foods' => $foodarray);
    
  }

echo "<pre>";
print_r($dining_list);
echo "</pre>";
*/


/*
$html = file_get_contents('http://menus.tufts.edu/foodpro/shortmenu.asp?sName=TUFTS+DINING&locationNum=11&locationName=Dewick-MacPhie+Dining+Center&naFlag=1&WeeksMenus=This+Week%27s+Menus&myaction=read&dtdate=5%2F4%2F2015'); //get the html returned from the following url

$dining_doc = new DOMDocument();

libxml_use_internal_errors(TRUE); //disable libxml errors

if(!empty($html)){ //if any html is actually returned
  
  $dining_doc->loadHTML($html); //loads up the HTML into the manipulatable DOMDocument
  libxml_clear_errors(); //remove errors for yucky html
  $dining_xpath = new DOMXPath($dining_doc); //allows us to run queries on the DOMDocument we loaded

  $dining_list = array();
  
  $dining_and_type = $dining_xpath->query('//td');
  
  if($dining_and_type->length > 0){  
  
    //loop through all the dinings
    foreach($dining_and_type as $pat){

        //get the name of the dining
        $name = $dining_xpath->query('//a[@name="Recipe_Desc"]', $pat)->item(0)->nodeValue;

        $food_types = array(); //reset $food_types for each dining
        $types = $dining_xpath->query('small[@class="aside"]/a', $pat);

        //loop through all the types and store them in the $food_types array
        foreach($types as $type){
            $food_types[] = $type->nodeValue; //the dining type
        }

        //store the data in the $dining_list array
        $dining_list[] = array('name' => $name, 'types' => $food_types);

    }
  }
}
*/


/*
    $dining_doc->loadHTML($html); //loads up the HTML into the manipulatable DOMDocument
    libxml_clear_errors(); //remove errors for yucky html

    $dining_xpath = new DOMXPath($dining_doc); //allows us to run queries on the DOMDocument we loaded

    //get all the h2's with an class, the double slashes search for every instance in the entire document
    $dining_row = $dining_xpath->query('//div[@class="shortmenurecipes"]');
    if($dining_row->length > 0){
        foreach($dining_row as $row){
            echo $row->nodeValue . "<br/>";  //nodeValue contains the text of the element we just specified
        }
    }
*/








?>