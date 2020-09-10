package concurrent.ABC;// 本题为考试多行输入输出规范示例，无需提交，不计分。

import java.util.Scanner;

public class Main {
    static class Node {
        int val;
        Node next;

        Node(int val) {
            this.val = val;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Node head1 = new Node(0);
        Node p = head1;
        int x = 0;
        for (int i = 0; i < n; i++) {
            x = sc.nextInt();
            p.next = new Node(x);
            p = p.next;
        }
        head1 = head1.next;
        Node head2 = new Node(0);
        p = head2;
        int m = sc.nextInt();
        for (int i = 0; i < m; i++) {
            x = sc.nextInt();
            p.next = new Node(x);
            p = p.next;
        }
        head2 = head2.next;
        Node res = deal(head1, head2);
        while (res != null) {
            System.out.print(res.val + " ");
            res = res.next;
        }

    }

    private static Node deal(Node head1, Node head2) {
        Node res = new Node(0);
        Node p = res;
        while (head1 != null && head2 != null) {
            if (head1.val == head2.val) {
                p.next = new Node(head1.val);
                p = p.next;
                head1 = head1.next;
                head2 = head2.next;
            } else if (head1.val > head2.val) {
                head1 = head1.next;
            } else {
                head2 = head2.next;
            }
        }
        return res.next;
    }
}