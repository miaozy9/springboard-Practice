$(async function() {
  // cache some selectors we'll be using quite a bit
  const $allStoriesList = $("#all-articles-list");
  const $submitForm = $("#submit-form");
  const $filteredArticles = $("#filtered-articles");
  const $loginForm = $("#login-form");
  const $createAccountForm = $("#create-account-form");
  const $ownStories = $("#my-articles");
  const $favStories = $("#favorited-articles")
  const $navLogin = $("#nav-login");
  const $navLogOut = $("#nav-logout");

  // global storyList variable
  let storyList = null;

  // global currentUser variable
  let currentUser = null;

  await checkIfLoggedIn();

  /**
   * Event listener for logging in.
   *  If successfully we will setup the user instance
   */

  $loginForm.on("submit", async function(evt) {
    evt.preventDefault(); // no page-refresh on submit

    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    // call the login static method to build a user instance
    const userInstance = await User.login(username, password);
    // set the global user to the user instance
    currentUser = userInstance;
    syncCurrentUserToLocalStorage();
    loginAndSubmitForm();
  });

  /**
   * Event listener for signing up.
   *  If successfully we will setup a new user instance
   */

  $createAccountForm.on("submit", async function(evt) {
    evt.preventDefault(); // no page refresh

    // grab the required fields
    let name = $("#create-account-name").val();
    let username = $("#create-account-username").val();
    let password = $("#create-account-password").val();

    // call the create method, which calls the API and then builds a new user instance
    const newUser = await User.create(username, password, name);
    currentUser = newUser;
    syncCurrentUserToLocalStorage();
    loginAndSubmitForm();
  });

  /**
   * Log Out Functionality
   */

  $navLogOut.on("click", function() {
    // empty out local storage
    localStorage.clear();
    // refresh the page, clearing memory
    location.reload();
  });

  /**
   * Event Handler for Clicking Login
   */

  $navLogin.on("click", function() {
    // Show the Login and Create Account Forms
    $loginForm.slideToggle();
    $createAccountForm.slideToggle();
    $allStoriesList.toggle();
  });

  /**
   * Event Handler for Clicking submit new story in nav
   * Drop down the submit form with all articles showing at the same time
   */

  $("#submit").on("click", async function() {
    if (currentUser) {
      hideElements();
      $allStoriesList.empty();
      await generateStories();
      $allStoriesList.show();
      $submitForm.slideToggle();
    }
  });

  /**
   * Event Handler for Clicking Favorites in nav
   * Drop down the favorite sotry list. Hide main stroy list.
   */
  $("#favorite").on("click", async function() {

    if (currentUser) {
      hideElements();
      $favStories.empty();  
      if (currentUser.favorites.length != 0) {
        for (let storyId of currentUser.favorites) {
          let story = await getStoryById(storyId)
          let favStoryHTML = generateStoryHTML(story);
          $favStories.append(favStoryHTML);
        }
      
      } else {
        $favStories.append("<h5>No favorite stories added by user yet!</h5>");
    }

    $favStories.show();
    }

  })

  async function generateOwnStories(){
    if (currentUser) {
      hideElements();
      $ownStories.empty()
      if (currentUser.ownStories.length != 0) {
        for (let storyId of currentUser.ownStories) {
          let story = await getStoryById(storyId)
          let ownStoryHTML = generateStoryHTML(story);
          ownStoryHTML.prepend(`<span class="trash-can"> <i class="fas fa-trash-alt"></i></span>`)
          $ownStories.append(ownStoryHTML);
        }     
      } 
      else {
        $ownStories.append("<h5>No stories added by user yet!</h5>");
      }

    $ownStories.show();
    }
  }

  /**
   * Event Handler for Clicking My Stories list in nav
   * Drop down the own sotry list. Hide all stories.
   */

  $("#ownStories").on("click", generateOwnStories);

  $ownStories.on("click", ".trash-can", async function(evt) {
    const storyId = $(evt.target).closest("li").attr("id");
    // remove the story from server
    await storyList.removeStory(currentUser, storyId);
    await generateStories();
    await generateOwnStories()

  });

  /**
   * Event Handler for Clicking submit button at submit new story section
   * 
   */

  $submitForm.on("submit", async function(evt) {
    evt.preventDefault();

    const title = $("#title").val();
    const url = $("#url").val();
    const author = $("#author").val();
    const username = currentUser.username

    //addStory returns a story object and add a story in the user's story list at server side
    const newStory = await storyList.addStory(currentUser, {
      title,
      author,
      url,
      username
    });

    //convert the story object to a li element and prepend to the storyList
    $allStoriesList.empty();
    await generateStories()
    $submitForm.slideToggle();
    $submitForm.trigger("reset");
  });

  // function generateStory

  /**
   * Event handler for Navigation to Homepage
   */

  $("body").on("click", "#nav-all", async function() {
    hideElements();
    await generateStories();
    $allStoriesList.show();
  });

  /**
   * On page load, checks local storage to see if the user is already logged in.
   * Renders page information accordingly.
   */

  async function checkIfLoggedIn() {
    // let's see if we're logged in
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // if there is a token in localStorage, call User.getLoggedInUser
    //  to get an instance of User with the right details
    //  this is designed to run once, on page load
    currentUser = await User.getLoggedInUser(token, username);
    await generateStories();

    if (currentUser) {
      showNavForLoggedInUser();
      updateUserInfo()
    }
  }

  function updateUserInfo() {
    // fill in all necessary fields in the user-profile container and update the user name in the nav bar
    $("#profile-name").append(" " + currentUser.name);
    $("#profile-username").append(" " + currentUser.username);
    $("#profile-account-date").append(" " + currentUser.createdAt.slice(0, 10));
    $("#nav-user-profile").append(currentUser.username);
  }

  /**
   * A rendering function to run to reset the forms and hide the login info
   */

  async function loginAndSubmitForm() {
    // hide the forms for logging in and signing up
    $loginForm.hide();
    $createAccountForm.hide();

    // reset those forms
    $loginForm.trigger("reset");
    $createAccountForm.trigger("reset");

    await generateStories();
    // show the stories
    $allStoriesList.show();

    // update the navigation bar

    showNavForLoggedInUser();
    updateUserInfo()
  }

  $("#nav-user-profile").on("click", function() {
    hideElements();
    $("#user-profile").show();
  });

  /**
   * A rendering function to call the StoryList.getStories static method,
   *  which will generate a storyListInstance. Then render it.
   */

  async function generateStories() {
    // get an instance of StoryList
    const storyListInstance = await StoryList.getStories();
    // update our global variable
    storyList = storyListInstance;
    // empty out that part of the page
    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
      const result = generateStoryHTML(story);
      $allStoriesList.append(result);
    }
  }

  /**
   * A function to render HTML for an individual Story instance
   */

  function generateStoryHTML(story) {
    let hostName = getHostName(story.url);
    let favSign = "far"
    if(currentUser){
      if(currentUser.favorites.includes(story.storyId)){
        favSign = "fas"
      }
    }

    // render story markup
    const storyMarkup = $(`
      <li id="${story.storyId}">
        <span class="fav">
          <i id="starSelector" class="${favSign} fa-star"></i>
        </span>
        <a class="article-link" href="${story.url}" target="a_blank">
          <strong>${story.title}</strong>
        </a>
        <small class="article-author">by ${story.author}</small>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-username">posted by ${story.username}</small>
      </li>
    `);

    return storyMarkup;
  }

  $(".articles-container").on("click", ".fav", async function(evt) {
    const storyId = $(evt.target).closest("li").attr("id");
    if (currentUser) {
      if ($(evt.target).hasClass("fas")) {
        await currentUser.removeFavorite(storyId);
        $(evt.target).closest("i").toggleClass("fas far");
      } else {
        await currentUser.addFavorite(storyId);
        $(evt.target).closest("i").toggleClass("fas far");
      }
    }
  });

  /* hide all elements in elementsArr */

  function hideElements() {
    const elementsArr = [
      $submitForm,
      $allStoriesList,
      $filteredArticles,
      $ownStories,
      $loginForm,
      $createAccountForm,
      $("#user-profile"),
      $favStories
    ];
    elementsArr.forEach($elem => $elem.hide());
  }

  function showNavForLoggedInUser() {
    $navLogin.hide();
    $("#logInFeatures").show()
    $("#nav-welcome").show()
    $navLogOut.show();
  }

  /* simple function to pull the hostname from a URL */

  function getHostName(url) {
    let hostName;
    if (url.indexOf("://") > -1) {
      hostName = url.split("/")[2];
    } else {
      hostName = url.split("/")[0];
    }
    if (hostName.slice(0, 4) === "www.") {
      hostName = hostName.slice(4);
    }
    return hostName;
  }

  /* sync current user information to localStorage */

  function syncCurrentUserToLocalStorage() {
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }
});
