import kotlin.collections.AbstractMutableMap;

import java.awt.geom.Point2D;
import java.util.HashMap;
import java.util.List;

public class JavaCode {
    public static String FindNearestPointFromList(List<Point2D> points, Point2D point) {
        Point2D nearest = points.get(0);
        double nearestDistance = point.distanceSq(nearest);
        for (int i = 1; i < points.size(); i++) {
            double distance = point.distanceSq(points.get(i));
            if (distance < nearestDistance) {
                nearest = points.get(i);
                nearestDistance = distance;
            }
        }
        System.out.println(nearest);
        return nearest.toString();
    }

    public static String FindNearestPointFromList(List<Point2D> points, List<String> names, Point2D point) {
        Point2D nearest = points.get(0);
        String nearestName = names.get(0);
        double nearestDistance = point.distanceSq(nearest);
        for (int i = 1; i < points.size(); i++) {
            double distance = point.distanceSq(points.get(i));
            if (distance < nearestDistance) {
                nearest = points.get(i);
                nearestName = names.get(i);
                nearestDistance = distance;
            }
        }
        System.out.println(nearest);
        return nearest.toString()+"; "+nearestName;
    }
}
