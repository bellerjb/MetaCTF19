import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

class Edge {
	public int parent;
	public int child;

	public Edge(int parent, int child) {
		super();
		this.parent = parent;
		this.child = child;
	}
}

public class thisbeforethatSet {
	public static Map<String, Integer> dictionary = new HashMap<String, Integer>();
	public static Map<Integer, String> rDictionary = new HashMap<Integer, String>();
	public static int counter = 0;

	public static int getKey(String s) {
		if (dictionary.containsKey(s)) {
			return dictionary.get(s);
		}
		final int count = counter++;
		dictionary.put(s, count);
		rDictionary.put(count, s);
		return count;
	}

	public static void main(String args[]) {
		final Scanner s = new Scanner(System.in);
		final List<Edge> edges = new LinkedList<Edge>();
		final List<Integer> roots = new ArrayList<Integer>();

		final int n = Integer.parseInt(s.nextLine());
		for (int i = 0; i < n; i++) {
			final String[] line = s.nextLine().split(" -> ");
			final int parent = getKey(line[0]);
			final int child = getKey(line[1]);
			final Edge edge = new Edge(parent, child);
			edges.add(edge);
			if (roots.indexOf(parent) == -1) {
				roots.add(parent);
			}
			final int indexFind = roots.indexOf(child);
			if (indexFind != -1) {
				roots.remove(indexFind);
			}
		}
		s.close();

		final Set<Integer> sorted = new HashSet<Integer>();
		while (roots.size() > 0) {
			final int root = roots.remove(0);
			sorted.add(root);
			final List<Edge> children = new LinkedList<Edge>();
			final Iterator<Edge> possibleEdges = edges.iterator();
			while (possibleEdges.hasNext()) {
				final Edge edge = possibleEdges.next();
				if (edge.parent == root) {
					children.add(edge);
				}
			}
			edges.removeAll(children);
			final Iterator<Edge> childIterator = children.iterator();
			while (childIterator.hasNext()) {
				final int child = childIterator.next().child;
				final Iterator<Edge> possibleChildEdges = edges.iterator();
				Boolean isParent = true;
				while (possibleChildEdges.hasNext()) {
					final Edge edge = possibleChildEdges.next();
					if (edge.child == child) {
						isParent = false;
						break;
					}
				}
				if (isParent && roots.indexOf(child) == -1) {
					roots.add(child);
				}
			}

		}

		if (edges.size() > 0) {
			System.out.println("IMPOSSIBLE!");
		} else {
			final Iterator<Integer> sortedIterator = sorted.iterator();
			while (sortedIterator.hasNext()) {
				final int node = sortedIterator.next();
				System.out.print(rDictionary.get(node));
				if (sortedIterator.hasNext()) {
					System.out.print(" -> ");
				}
			}
		}
	}
}
