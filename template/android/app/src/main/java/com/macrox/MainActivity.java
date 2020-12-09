package com.macrox;

import android.annotation.SuppressLint;
import android.view.View;

import ru.insight.people.R;
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
