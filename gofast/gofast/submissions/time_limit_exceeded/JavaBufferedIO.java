import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class JavaBufferedIO {
	public static void main(String args[]) throws IOException {
		final InputStream in = new BufferedInputStream(System.in);
		final OutputStream out = new BufferedOutputStream(System.out);

		for (int c = 0; (c = in.read()) != '\n';) {
			out.write(c);
		}
		out.flush();
	}
}
