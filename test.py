from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import Select
import time
from webdriver_manager.chrome import ChromeDriverManager


webdriver_path = r"C:\Users\Dell\Downloads\chromedriver-win32\chromedriver-win32\chromedriver.exe"

chrome_options = webdriver.ChromeOptions()

service = webdriver.chrome.service.Service(executable_path=webdriver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

try:

    driver.get("http://localhost:3000/index")
    if "Resto-HUB" in driver.title:
        print("TC01 Passed: Home page is displayed")
    else:
        print("TC01 Failed: Home page is not displayed")
    time.sleep(1)
    logo_button = driver.find_element(By.CSS_SELECTOR, "#logo a")
    logo_button.click()

    driver.get('http://localhost:3000/index')
    if 'Resto-HUB' in driver.title :
         print("TC02 Passed:reloaded the home page")
    else:
        print("TC02 Failed: Home page is not reloaded")
    time.sleep(1)

    visit_restaurants_button= driver.find_element(By.CSS_SELECTOR, "a.card-hover[href='restaurants']")
    visit_restaurants_button.click()
    driver.get("http://localhost:3000/restaurants")
    if 'http://localhost:3000/restaurants' in  driver.current_url:
        print("TC03 Passed:Restaurants should be displayed")
    else:
        print("TC03 Failed: Restaurants page is not displayed")
    time.sleep(1)

    element = driver.find_element(By.CSS_SELECTOR, "div.restaurant-actions a")
    href_value = element.get_attribute("href")
    element.click()
    driver.get(href_value)
    if href_value in driver.current_url:
        print("TC04 Passed:Restaurant detailed page should be displayed")
    else:
        print("TC04 Failed: Restaurants deatiled page  is not displayed")
    time.sleep(2)

    driver.get('http://localhost:3000/owners')
    if 'http://localhost:3000/owners' not in driver.current_url:
        print("TC05 Passed:Page should be displayed after login only")
    else:
        print("TC05 Failed: page is displayed")
    time.sleep(1)     

    driver.get("http://localhost:3000/blogs")
    main_element = driver.find_element(By.ID, "all-posts")
    h1_element = main_element.find_element(By.TAG_NAME, "h1")
    h1_text = h1_element.text
    if h1_text=='All Blogs':
        print("TC06 Passed:Blogs page should be displayed")
    else:
        print("TC06 Failed: Blogs page is not displayed")
    time.sleep(1)


    element = driver.find_element(By.CSS_SELECTOR, "div.post-actions a")
    href_value = element.get_attribute("href")
    driver.get(href_value)
    if href_value in driver.current_url:
        print("TC07 Passed:Restaurants should be displayed")
    else:
        print("TC07 Failed: Restaurants page is not displayed")
    time.sleep(1)
    
    driver.get("http://localhost:3000/about")
    if '/about' in driver.current_url :
        print("TC08 Passed:About page should be displayed")
    else:
        print("TC08 Failed: About page is not displayed")
    time.sleep(1)

    driver.get("http://localhost:3000/login")
    if "Login" in driver.title:
        print("TC09 Passed:Login page should be displayed")
    else:
        print("TC09 Failed: Login page is not displayed")
    time.sleep(1)

    driver.get("http://localhost:3000/signup")
    if "Signup" in driver.title:
        print("TC10 Passed: Login for singup should be displayed")
    else:
        print("TC10 Failed: singup page not displayed")
    time.sleep(1)


    driver.get("http://localhost:3000/owners")
    if "Welcome" in driver.title:
        print("TC11 Passed: Home page for owners is displayed")
    else:
        print("TC11 Failed: Home page for owners is not displayed")
    time.sleep(1)


    signup_button = driver.find_element(By.CSS_SELECTOR, "a.btn-sl[href='/signup']")
    signup_button.click()
    driver.get("http://localhost:3000/signup")
    if "Signup" in driver.title:
        print("TC12 Passed: Login for singup should be displayed")
    else:
        print("TC12 Failed: singup page not displayed")
    time.sleep(1)

    # email_field=driver.find_element(By.ID,"email")
    # confirmEmail_field=driver.find_element(By.ID,"confirm-email")
    # password_field=driver.find_element(By.ID,"password")

    # email_field.send_keys('pravinchavan3002@gmail.com')
    # confirmEmail_field.send_keys('pravinchavan3002@gmail.com')
    # password_field.send_keys('pravin@123')

    # submit_button=driver.find_element(By.CLASS_NAME,'btn')
    # submit_button.click()
    # if 'http://localhost:3000/login' in driver.current_url:
    #     print("TC13 Passed: singup success")
    # else:
    #     print("TC13 Failed: singup fails")
    # time.sleep(2)
        

    driver.get("http://localhost:3000/login")
    email_field=driver.find_element(By.ID,"email")
    password_field=driver.find_element(By.ID,"password")
    
    email_field.send_keys('pratikchavan470@gmail.com')
    password_field.send_keys('pratik')
    submit_button=driver.find_element(By.CLASS_NAME,'btn')
    submit_button.click()
    
    if 'http://localhost:3000/admin-blogs' in driver.current_url:
        print("TC14 Passed: Login success")
    else:
        print("TC14 Failed: Login fails")
    time.sleep(1)  

    element = driver.find_element(By.ID, "view-blog")
    href_value = element.get_attribute("href")
    driver.get(href_value)
    if href_value in driver.current_url:
        print("TC15 Passed:Blog page is displayed")
    else:
        print("TC15 Failed: Blog page is not displayed")
    time.sleep(1)
    
    driver.get('http://localhost:3000/admin-blogs')
    element = driver.find_element(By.ID, "edit-blog")
    href_value = element.get_attribute("href")
    driver.get(href_value)
    if href_value in driver.current_url:
        print("TC16 Passed:Edit blog page is displayed")
    else:
        print("TC16 Failed: Edit page is not displayed")
    time.sleep(1)

    # edit_title=driver.find_element(By.ID,"title")
    # edit_title.send_keys(' updated title')
    # update_blog_button=driver.find_element(By.CLASS_NAME,'btn')
    # update_blog_button.click()
    # if 'http://localhost:3000/admin-blogs' in driver.current_url:
    #   print("TC17 Passed:Blog is updated")
    # else:
    #     print("TC17 Failed: Blog are updated")

    driver.get('http://localhost:3000/admin-blogs')
    add_blog_button=driver.find_element(By.ID,'add-new-blog')
    add_blog_button.click()

    if 'http://localhost:3000/new-post' in driver.current_url:
        print("TC18 Passed:Add Post page is displayed")
    else:
        print("TC18 Failed: add post page is not displayed")
    time.sleep(1)
 
    driver.get('http://localhost:3000/recommend')
    if 'Add new post' in driver.title:
        print("TC19 Passed:Add restaurant page is displayed")
    else:
        print("TC19 Failed:  add restaurant page is not displayed")
    time.sleep(1)

    driver.get('http://localhost:3000/blog-detail/653bb839f7c711be2010e495')
    if 'Blog title' in driver.title:
        print("TC20 Passed:Blog detailed page for owners is displayed")
    else:
        print("TC20 Failed:Blog deatiled page for ownder is  not displayed")
    time.sleep(1)

    driver.get('http://localhost:3000/')
    facebook_btn = driver.find_element(By.CLASS_NAME ,'facebook')
    if facebook_btn :
        print("TC21 Passed:facebbok page is displayed")
    else:
        print("TC21 Failed:Facebook page is  not displayed")
    time.sleep(1)

    driver.get('http://localhost:3000/')
    twitter_btn = driver.find_element(By.CLASS_NAME ,'twitter')
    if  twitter_btn:
        print("TC22 Passed:Instagram page is displayed")
    else:
        print("TC22 Failed:Instagram page is  not displayed")
    time.sleep(1)

    driver.get('http://localhost:3000/')
    linkedin_btn = driver.find_element(By.CLASS_NAME ,'linkedin')
    if  linkedin_btn :
        print("TC23 Passed:LinkedIn page is displayed")
    else:
        print("TC23 Failed:LinkedIn  page is  not displayed")
    time.sleep(1)

   
    driver.get('http://localhost:3000/owners')
    email=driver.find_element(By.CLASS_NAME,'login-email')
    if 'You logged as pratikchavan470@gmail.com' in email.text:
        print("TC24 Passed:Logged in email id is displayed")
    else:
        print("TC24 Failed:Logged in email id is not displayed")
    time.sleep(1)

    driver.get("http://localhost:3000/blogs/6457f916919155091d448200")
    if 'Resto-HUB' in driver.title:
        print("TC25 Passed:Blogs detailed page  should be displayed")
    else:
        print("TC25 Failed: Blogs detiailed is not displayed")
    time.sleep(1)

    driver.get('http://localhost:3000/owners')
    element = driver.find_element(By.XPATH, "//a[@href='/admin-blogs' and text()='Blogs Here!!!']")
    element_text = element.text
    element.click()
    if 'http://localhost:3000/admin-blogs' in driver.current_url:
         print("TC26 Passed:Blogs  is displayed from home page")
    else:
        print("TC26 Failed: Blogs page is not displayed")
    time.sleep(1)

    driver.get('http://localhost:3000/restaurants/64533c42a68b5933cec00fdc')
    element = driver.find_element(By.CLASS_NAME ,'view-website')
    element.click()
    if 'Google' in driver.title:
           print("TC27 Passed:website visited succesfully")
    else:
        print("TC27 Failed:Invalid website url")
    time.sleep(1)
    
    
    driver.get('http://localhost:3000/login')
    element=driver.find_element(By.ID ,'signup-btn')
    element.click()
    if 'http://localhost:3000/signup'  in driver.current_url:
        print("TC28 Passed:signnup visited succesfully")
    else:
        print("TC28 Failed:Not visited signup page")
    time.sleep(1)

    driver.get('http://localhost:3000/signup')
    element=driver.find_element(By.ID ,'login-btn')
    element.click()
    if 'http://localhost:3000/login'  in driver.current_url:
        print("TC29 Passed:Login visited succesfully")
    else:
        print("TC29 Failed:Not visited Login page")
    time.sleep(1)

    driver.get('http://localhost:3000/restaurants')
    if driver.current_url:
         print("TC30 Passed:About page is visited")
    else:
        print("TC30 Failed:About page is not vistied")
    time.sleep(1)
 



   
   


   
   



    

    


 




  
      
 
    
    
   

   
   

    

except Exception as e:
    print(f"An error occurred: {str(e)}")


driver.quit()