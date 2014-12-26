$( document ).ready( function ()
{
    String.prototype.capitalize = function ()
    {
        return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
    }

    function changeTurn()
    {
        color = $( '#turn' ).text();

        //$( '#pawn_' + color ).children().hide();

        if( color == 'green' )
        {
            color = 'blue';
        }
        else
        {
            color = "green";
        }

        $( '#turn' ).text( color ).css( 'color', color );

        pawn_next( $( '#pawn_' + color ) );

        $( '.q_fence_intersection' ).css( 'pointer-events', 'auto' );

    }

    function pawn_next( pawn_container )
    {
        if( $( pawn_container ).attr( 'id' ) == 'pawn_green' )
        {
            $( pawn_container ).children( '.pawn_next' ).css( 'background-color', 'rgba(0, 255, 0, 0.5)' );
        }
        else
        {
            $( pawn_container ).children( '.pawn_next' ).css( 'background-color', 'rgba(0, 0, 255, 0.5)' );
        }

        $( pawn_container ).children( '.pawn_next' ).fadeIn().each(
            function ( index, element )
            {
                console.log( $( this ).overlaps( '.pawn' ) );

                if( $( this ).overlaps( '.pawn' ).length > 0 )
                {
                    switch( $( this ).attr( 'class' ) )
                    {
                        case 'pawn_next pawn_next_0':
                            $( this ).css( 'top', -122 );
                            break;
                        case 'pawn_next pawn_next_90':
                            $( this ).css( 'left', 120 );
                            break;
                        case 'pawn_next pawn_next_180':
                            $( this ).css( 'top', 117 );
                            break;
                        case 'pawn_next pawn_next_270':
                            $( this ).css( 'left', -120 );
                            break;
                    }
                }
                else
                {
                    switch( $( this ).attr( 'class' ) )
                    {
                        case 'pawn_next pawn_next_0':
                            $( this ).css( 'top', -63 );
                            break;
                        case 'pawn_next pawn_next_90':
                            $( this ).css( 'left', 60 );
                            break;
                        case 'pawn_next pawn_next_180':
                            $( this ).css( 'top', 57 );
                            break;
                        case 'pawn_next pawn_next_270':
                            $( this ).css( 'left', -60 );
                            break;
                    }
                }

                if( $( this ).overlaps( '.q_tile' ).length == 0 )
                {
                    $( this ).hide();
                }
            }
        );
        $( '.q_fence_placed' ).each(
            function ( index, element )
            {
                row_minus_1 = parseInt( $( this ).attr( 'data-row' ) ) - 1;
                row_plus_1 = parseInt( $( this ).attr( 'data-row' ) ) + 1;
                if( $( this ).attr( 'data-orientation' ) == 'h' )
                {
                    if(
                        pawn_container.parent().attr( 'id' ) == $( this ).attr( 'data-column' ) + $( this ).attr( 'data-row' )
                        || pawn_container.parent().attr( 'id' ) == ( String.fromCharCode( $( this ).attr( 'data-column' ).charCodeAt( 0 ) - 1 ) ) + $( this ).attr( 'data-row' )
                    )
                    {
                        $( pawn_container ).children( '.pawn_next_180' ).fadeOut();
                        //alert( '180' );
                    }
                    if(
                        pawn_container.parent().attr( 'id' ) == $( this ).attr( 'data-column' ) + row_plus_1
                        || pawn_container.parent().attr( 'id' ) == ( String.fromCharCode( $( this ).attr( 'data-column' ).charCodeAt( 0 ) - 1 ) ) + row_plus_1
                    )
                    {
                        $( pawn_container ).children( '.pawn_next_0' ).fadeOut();
                        //alert( '0' );
                    }
                }
                else
                {
                    if(
                        pawn_container.parent().attr( 'id' ) == $( this ).attr( 'data-column' ) + $( this ).attr( 'data-row' )
                        || pawn_container.parent().attr( 'id' ) == $( this ).attr( 'data-column' ) + row_plus_1
                    )
                    {
                        $( pawn_container ).children( '.pawn_next_270' ).fadeOut();
                        //alert( '270' );
                    }
                    if(
                        pawn_container.parent().attr( 'id' ) == ( String.fromCharCode( $( this ).attr( 'data-column' ).charCodeAt( 0 ) - 1 ) ) + $( this ).attr( 'data-row' )
                        || pawn_container.parent().attr( 'id' ) == ( String.fromCharCode( $( this ).attr( 'data-column' ).charCodeAt( 0 ) - 1 ) ) + row_plus_1
                    )
                    {
                        $( pawn_container ).children( '.pawn_next_90' ).fadeOut();
                        //alert( '90' );
                    }
                }
            }
        );
    }

    function place_fence( event )
    {
        if( $( '#' + $( '#turn' ).text() + '_fence_count' ).text() != 0 )
        {
            $( '.pawn_next' ).fadeOut();
            iPosition = $( this ).position();
            $( '#fence' ).clone( true ).css( {top: iPosition.top - 50, left: iPosition.left + 50} )
                .attr( 'id', $( this ).attr( 'data-intersection' ) + 'v' )
                .attr( 'data-row', $( this ).attr( 'data-row' ) )
                .attr( 'data-column', $( this ).attr( 'data-column' ) )
                .attr( 'data-color', $( '#turn' ).text() )
                .addClass( 'q_fence_active' ).show().appendTo( $( '#gameboard' ) );
            $( '.q_fence_intersection' ).css( 'pointer-events', 'none' );
        }
        else
        {
            alert( 'Sorry, You are out of fences' );
            console.log( $( '#turn' ).text() + ' is out of fences' );
        }
    }

    function draw_board()
    {
        gameboard = $( '#gameboard' );
        for( r = 1; r < 10; r++ )
        {
            gameboard.append( '<div class="q_row"> <!-- begin row -->' );

            for( c = 97; c < 106; c++ )
            {
                col = String.fromCharCode( c );
                gameboard.append( '<div class="q_tile" data-row="' + r + '" data-column="' + col + '" id="' + col + r + '"></div>' );
            }

            gameboard.append( '</div> <!-- end row -->' );

            if( r < 9 )
            {
                gameboard.append( '<div class="q_row"> <!-- begin row -->' );

                gameboard.append( '<div class="q_fence_intersection_pad"></div>' );

                for( i = 98; i < 106; i++ )
                {
                    col = String.fromCharCode( i );
                    // first one should be a2 and last should be a9
                    gameboard.append( '<div class="q_fence_intersection" data-row="' + r + '" data-column="' + col + '" data-intersection="' + col + r + '"></div>' );
                }

                gameboard.append( '</div> <!-- end row -->' );
            }
        }

        // place the 2 pawns
        $( '#e1' ).append( '<div id="pawn_green" class="pawn_container"> <div class="pawn pawn_green"></div> <div class="pawn_next pawn_next_0"></div> <div class="pawn_next pawn_next_180"></div> <div class="pawn_next pawn_next_90"></div> <div class="pawn_next pawn_next_270"></div> </div>' );
        $( '#e9' ).append( '<div id="pawn_blue" class="pawn_container"> <div class="pawn pawn_blue"></div> <div class="pawn_next pawn_next_0"></div> <div class="pawn_next pawn_next_180"></div> <div class="pawn_next pawn_next_90"></div> <div class="pawn_next pawn_next_270"></div> </div>' );

        $.cookies.set( 'pawn_green', 'e1' );
        $.cookies.set( 'pawn_blue', 'e9' );
    }

    function main()
    {
        draw_board();

        changeTurn();

        $( '.q_fence_intersection' ).on( 'click', place_fence );

        $( '.q_fence_rotator' ).click( function ()
        {
            fence = $( this ).parent();
            fence.toggleClass( 'q_fence_rotated' );
            fence.children().toggleClass( 'q_fence_button_rotated' );

            if( fence.attr( 'data-orientation' ) == 'v' )
            {
                fence.attr( 'data-orientation', 'h' );
            }
            else
            {
                fence.attr( 'data-orientation', 'v' );
            }
            fence.attr( 'id', fence.attr( 'data-column' ) + fence.attr( 'data-row' ) + fence.attr( 'data-orientation' ) );
        } );

        $( '.q_fence_confirm' ).click( function ()
        {
            console.log( 'fence ' + $( this ).parent().attr( 'id' ) + ' was placed' );
            $( this ).parent().removeClass( 'q_fence_active' ).addClass( 'q_fence_placed' ).children().remove();

            fence_count = $( '#' + $( '#turn' ).text() + '_fence_count' );
            if( fence_count.text() != 0 )
            {
                fence_count.text( fence_count.text() - 1 );
            }
            changeTurn();
        } );

        $( '.q_fence_remove' ).click( function ()
        {
            $( this ).parent().remove();
            pawn_next( $( '#pawn_' + $( '#turn' ).text() ) );
            $( '.q_fence_intersection' ).css( 'pointer-events', 'auto' );
        } );

        $( '.pawn_next' ).click( function ()
        {
            pawn = $( this ).parent();
            $( this ).overlaps( '.q_tile' ).append( pawn.detach() );
            pawn_color = pawn.attr( 'id' ).substring( 5 );
            pawn_tile = pawn.parent().attr( 'id' );
            console.log( pawn_color + ' to ' + pawn_tile );

            pawn_object = {pawn_color: pawn_tile};

            backend.update( pawn_object );

            $.cookies.del( pawn.attr( 'id' ) );
            $.cookies.set( pawn.attr( 'id' ), pawn.parent().attr( 'id' ) );
            pawn.children( '.pawn_next' ).hide();
			if( pawn.attr( 'id' ) == 'pawn_green' && pawn.parent().attr( 'data-row' ) == 9 )
			{
				alert( 'Green Wins!!!' );
				$( '.q_fence_intersection' ).unbind( 'click' );
			}
			else
			{
				if( pawn.attr( 'id' ) == 'pawn_blue' && pawn.parent().attr( 'data-row' ) == 1 )
				{
					alert( 'Blue Wins!!!' );
					$( '.q_fence_intersection' ).unbind( 'click' );
				}
				else
				{
					changeTurn();
				}
			}
        } );
    }

    main();

    var backend = new Cenny( {url: 'http://quoridor.canisconsulting.com/server/cenny.php'} );
} );
