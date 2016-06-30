#!/usr/bin/perl -wT
# credit to O'Reilly
# http://docstore.mik.ua/orelly/linux/cgi/ch09_04.htm
use strict;
use CGI;

# Clean up environment for taint mode before calling sendmail
BEGIN {
    $ENV{PATH} = "/bin:/usr/bin";
    delete @ENV{ qw( IFS CDPATH ENV BASH_ENV ) };
}

my $q       = CGI->new;
my $blah = $q->param( "email" );
my $email   = validate_email_address( $q->param( "email" ) );
my $message = $q->param( "message" );
my $name    = $q->param( "name" );

unless ( $email ) {
    print $q->header( "text/html" ),
          $q->start_html( "Invalid Email Address" ),
          $q->h1( "Invalid Email Address" ),
          $q->p( "The email address you entered is invalid. " .
                 "Please use your browser's Back button to " .
                 "return to the form and try again." );
          $q->end_html;
    exit;
}

send_feedback( $email, $message, $name);
send_receipt( $email );

print $q->redirect( "/feedback/thanks.html" );

sub validate_email_address {
	my ($email) = @_;
	return $email if $email =~ /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
	return "";
}

sub send_feedback {
    my( $email, $message, $name) = @_;
    my $from_email = 'messager@stevenxu.xyz';
    open MAIL, "| /usr/lib/sendmail -t -f'$from_email' -i"
        or die "Could not open sendmail: $!";
    
    print MAIL <<END_OF_MESSAGE;
To: s\@stevenxu.xyz
Reply-To: $email
Subject: Web Site Feedback

Email: $email
Feedback from $name:

$message
END_OF_MESSAGE
    close MAIL or die "Error closing sendmail: $!";
}

sub send_receipt {
    my $email = shift;
		my $from_email = 'do-not-reply@stevenxu.xyz';
		
    open MAIL, "| /usr/lib/sendmail -t -f'$from_email'"
        or die "Could not open sendmail: $!";
    print MAIL <<END_OF_MESSAGE;
To: $email
Subject: Thanks for the message!

This is an automated response confirming that I received your message that you sent on stevenxu.xyz. I will get back to you shortly!

Steven
END_OF_MESSAGE
    close MAIL or die "Error closing sendmail: $!";
}