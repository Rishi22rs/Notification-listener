import { AppRegistry } from 'react-native'
import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';

// To check if the user has permission
const status = await RNAndroidNotificationListener.getPermissionStatus()
console.log(status) // Result can be 'authorized', 'denied' or 'unknown'

// To open the Android settings so the user can enable it
RNAndroidNotificationListener.requestPermission()

/**
 * Note that this method MUST return a Promise.
 * Is that why I'm using a async function here.
 */
const headlessNotificationListener = async ({ notification }) => {/**
     * This notification is a JSON string in the follow format:
     *  {
     *      "time": string,
     *      "app": string,
     *      "title": string,
     *      "titleBig": string,
     *      "text": string,
     *      "subText": string,
     *      "summaryText": string,
     *      "bigText": string,
     *      "audioContentsURI": string,
     *      "imageBackgroundURI": string,
     *      "extraInfoText": string,
     *      "groupedMessages": Array<Object> [
     *          {
     *              "title": string,
     *              "text": string
     *          }
     *      ],
     *      "icon": string (base64),
     *      "image": string (base64), // WARNING! THIS MAY NOT WORK FOR SOME APPLICATIONS SUCH TELEGRAM AND WHATSAPP
     *  }
     * 
     * Note that this properties depends on the sender configuration
     * so many times a lot of them will be empty
     */
    
    if (notification) {
        console.log(notification)
    }
}

/**
 * This should be required early in the require sequence
 * to make sure the JS execution environment is setup before other
 * modules are required.
 * 
 * Your entry file (index.js) would be the better place for it.
 * 
 * PS: I'm using here the constant RNAndroidNotificationListenerHeadlessJsName to ensure
 *     that I register the headless with the right name
 */
AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName,	() => headlessNotificationListener)