package com.notificationlistener; // replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;
// import androidx.appcompat.app.AppCompatActivity;
// import android.content.pm.ApplicationInfo;
import 	android.content.pm.ApplicationInfo;
import java.util.List;


public class ListOfAppsInstalled extends ReactContextBaseJavaModule {
    ListOfAppsInstalled(ReactApplicationContext context) {
        super(context);
        System.out.println("************************ "+context);
    }
    @Override
    public String getName() {
        return "AppListModule";
    }

    @ReactMethod
    public void show(String message, Callback callBack){
        // List<ApplicationInfo> listApplicationInfo = getPackageManager().getInstalledApplications(PackageManager.GET_META_DATA);
        // String[] stringsList = new String[listApplicationInfo.size()];
        // int i=0;
        // for (ApplicationInfo applicationInfo: listApplicationInfo){
        //     stringsList[i] = applicationInfo.packageName;
        //     i++;
        // }
        // String pm = getReactApplicationContext().getPackageManager().getInstalledPackages();
        List<ApplicationInfo> pm=getReactApplicationContext().getPackageManager().getInstalledApplications(0);
        // System.out.println("*************** "+pm);

        String[] stringsList = new String[pm.size()];
        int i=0;
        for (ApplicationInfo applicationInfo: pm){
            stringsList[i] = applicationInfo.splitNames.toString();
            i++;
        }

        WritableArray array = Arguments.createArray();
        for (String co : stringsList) {
            array.pushString(co);
        }

        System.out.println("Message from native module "+message);
        callBack.invoke(array);
    }
}