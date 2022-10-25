package cz.hackathon.hkbackend.schedules;

import cz.hackathon.hkbackend.http.API;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class APIScheduler {

    private static final int DELAY = 7;

    private boolean running = false;
    private final long period;

    public APIScheduler() {
        period = TimeUnit.DAYS.toMillis(DELAY);
    }

    public void start() {
        this.running = true;
        CompletableFuture.runAsync(() -> {
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    if (running) {
                        API.getUpdatedData();
                    }
                }
            }, 0L, period);
        });
    }

}
