import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

public class repetition {
    public static void main(String[] args) {
        final Scanner s = new Scanner(System.in);
        final long a = s.nextLong();
        final long c = s.nextLong();
        final long m = s.nextLong();
        long iter = s.nextLong();
        s.close();

        long count = 1;
        final List<Long> found = new LinkedList<Long>();
        while (!found.contains(iter)) {
            found.add(iter);
            iter = nextNum(iter, m, a, c);
            count++;
        }

        System.out.println(count);
        System.out.println(iter);
    }

    private static long nextNum(long x, long m, long a, long c) {
        return (a * x + c) % m;
    }
}
