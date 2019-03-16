import java.io.IOException;
import java.util.Scanner;

public class JavaScanner {
	public static void main(String args[]) throws IOException {
		final Scanner in = new Scanner(System.in);

		System.out.println(in.nextLine());

		in.close();
	}
}
