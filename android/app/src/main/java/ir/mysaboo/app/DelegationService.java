package ir.mysaboo.app;


// Saboo registers no extra delegation handlers (no location delegation,
// no notification delegation) — plain Trusted Web Activity service.
public class DelegationService extends
        com.google.androidbrowserhelper.trusted.DelegationService {
    @Override
    public void onCreate() {
        super.onCreate();
    }
}
