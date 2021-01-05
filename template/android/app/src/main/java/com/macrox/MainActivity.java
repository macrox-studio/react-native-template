package com.macrox;

import com.macrox.R;
import android.view.View;
import android.annotation.SuppressLint;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
    @SuppressLint("UseCompatLoadingForDrawables")
    @Override
    protected void addDefaultSplashLayout() {
        View view = new View(this);
        view.setBackground(getResources().getDrawable(R.drawable.background_splash));
        setContentView(view);
    }
}
