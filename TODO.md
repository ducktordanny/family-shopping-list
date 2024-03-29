# TODO:

-   [x] FIX VULNARABILITY:

    -   https://stackoverflow.com/questions/46334249/which-is-the-correct-method-of-upgrading-react-native-in-your-app
    -   https://reactnative.dev/docs/upgrading
    -   https://github.com/react-native-community/cli

-   [x] Design idea: at the button rounded buttons one with an arrow icon named Groups (back to groups) and one with a plusz icon named Create/Add
-   [x] Finish GroupSettingsScreen and ProductDetailsScreen design.
-   [x] Fix design. Components, SafeArea etc.
-   [x] Update README.
-   [x] CHECK useRoute() AT REACT NAVIGATION
-   [x] ~~ Header with profile picture and if you click on it then it navigates to your profile. ~~
-   [x] GroupDetailsScreen could consist of two parts:
    -   Top: Group info (who created, when created, rename, leave group, delete group (only the creator))
    -   Bottom: added products
-   [ ] In authentication when we verify if a user is existing then we should just simply use User.findOrCreate(...).
-   [ ] Create a middleware for accessing to groups and items only if a user is included in that group.
-   [x] Basic client design.
-   [x] ISSUE: if we have no groups then the GroupsScreen just loading.
-   [x] Using easy-peasy might be easier with typescript
-   [x] React Native store user accessToken on client: https://react-native-async-storage.github.io/async-storage/docs/usage
-   [x] Redux.
-   [x] React Navigation for Stacks.
-   [x] Research for views.
-   [x] Validation for new group etc.
-   [x] Deal with device rotation (should block it).
    -   [x] android
    -   [x] ios
-   [x] Fix MiniUserCard: the border is not changing on dark mode.
-   [x] Fix TextField: the placeholder's color is not changing on dark mode.
-   [ ] ~~Fix KeyboardAvoidingView: When the KeyboardAvoidingView is the conatainer of a screen then only the scrollable part is moving up.~~
-   [ ] Should add ErrorHandling Component to client side. (maybe a simple alert?)
-   [ ] Fix Android Studio somehow... :)
-   [ ] Finish configuring with react-navigation in android.
    -   [ ] Test it.
-   [ ] ~~Should add a refresh button and also update product screen style.~~
-   [ ] Should implement refreshing with RefreshControl (https://reactnative.dev/docs/refreshcontrol)
    -   [x] Still implement it in group members.
    -   [ ] Refresh the product list when we are going back (there might be some changes).
        -   https://stackoverflow.com/questions/44223727/react-navigation-goback-and-update-parent-state
        -   https://stackoverflow.com/questions/51723511/reload-screen-after-navigation-goback-in-react-native
        -   https://reactnavigation.org/docs/use-is-focused/
-   [x] Should test modified HeaderView.
-   [ ] Should test fixed back navigation in ProductScreen.
-   [ ] Should finish Layout implementation and separate screens for multiple components to have a nicer look.

## For later:

-   Deploy app to own iphone: https://medium.com/@tewolfe2/deploying-a-react-native-application-to-your-iphone-1d5f9757be48
-   React-Native with Redux: https://www.imaginarycloud.com/blog/react-native-redux/
-   Passport-verify: http://www.passportjs.org/packages/passport-verify/
-   Passport-jwt: https://www.sitepoint.com/spa-social-login-google-facebook/
