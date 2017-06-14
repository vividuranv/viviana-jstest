#JS Challenges

## About
This a gulp application that contains the "Cash Register" and the "Pair Wise" challenges. Developed as a part of an interview for GFT.

## Author 
Viviana Durán Vega

## Table of Contents

  1. [Run project](#run-project)
  1. [Cash Register Challenge](#cash-register-challenge)
  1. [Pair Wise Challenge](#pair-wise-challenge)
  1. [Gulp](#gulp)
  1. [Saas](#saas)
 
## Run Project
- First you should have installed ``nodejs`` and ``gulpjs`` in your envoriment.
    - http://y2u.be/VnqrMwpZM7E
- In the terminal navigate to the project folder.
- Run ``npm install``, in order to install all the necessary dependencies.
- Run ``gulp``.


## Cash Register Challenge
  - Design a CashRegister that allows you to make payment by passing "price", "cash" and then calculates if the change due isavailable, if the amount is available then return "Change Due: $1.01" if it does not have sufficient cash the return "Insufficient Funds" and after paid is trigger then it returns "Closed". Also you should be able to call square at the end od day, initial cash + sold amount it should equal totalAmount available.

  Note remember the cash register should know how many of each amount it contains, and it could use cambinations of each to give you the change.

  *Example:*

  ```javascript
  [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0],]
  /* It always has all 9 denominations, even when they are 0 */
  ```

**[Back to top](#table-of-contents)**

### Pair Wise Challenge
  - Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.
  
  If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of indices. Once an element has been used, it cannot be reused to pair with another.
  
  For example ``pairWise([7, 9, 11, 13, 15], 20)`` returns 6. The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.



**[Back to top](#table-of-contents)**

### Gulp

  - In order to run the challenge you should have gulp installed since it is used as the task runner.
  
  It compiles the javascript into a single file (main.js) to serve the application:
  ```javascript
    gulp.task('scripts', function() {
        return gulp.src('src/script/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'));
    });
  ```

    Also the css styles created with saas (.scss) are compiled into css files:
  ```javascript
    gulp.task('styles', function () {
        return gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'));
    });
  ```

**[Back to top](#table-of-contents)**

### Saas

  - Saas is used as pre-processor language for CSS.

**[Back to top](#table-of-contents)**
